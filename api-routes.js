
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { User, Gig, Bid } = require('./models');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

// Middleware: Verify Auth
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not logged in.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Session expired.' });
  }
};

// --- AUTH ROUTES ---
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed.' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: 'Login failed.' });
  }
});

router.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out.' });
});

// --- GIG ROUTES ---
router.get('/gigs', async (req, res) => {
  const { search } = req.query;
  const query = search ? { title: { $regex: search, $options: 'i' } } : {};
  const gigs = await Gig.find(query).sort('-createdAt');
  res.json(gigs);
});

router.post('/gigs', protect, async (req, res) => {
  if (req.user.role !== 'CLIENT') return res.status(403).json({ message: 'Only clients can post.' });
  const gig = await Gig.create({ ...req.body, ownerId: req.user._id, ownerName: req.user.name });
  res.status(201).json(gig);
});

// --- BID ROUTES ---
router.post('/bids', protect, async (req, res) => {
  if (req.user.role !== 'FREELANCER') return res.status(403).json({ message: 'Only freelancers can bid.' });
  const bid = await Bid.create({ ...req.body, freelancerId: req.user._id, freelancerName: req.user.name });
  res.status(201).json(bid);
});

router.get('/bids/:gigId', protect, async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId }).sort('-createdAt');
  res.json(bids);
});

// --- CRITICAL: ATOMIC HIRE LOGIC (TRANSACTION) ---
router.patch('/bids/:bidId/hire', protect, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) throw new Error('Bid not found');

    const gig = await Gig.findById(bid.gigId).session(session);
    if (gig.ownerId.toString() !== req.user._id.toString()) throw new Error('Not authorized');
    if (gig.status === 'ASSIGNED') throw new Error('Gig already filled');

    // 1. Update Gig Status
    gig.status = 'ASSIGNED';
    gig.hiredFreelancerId = bid.freelancerId;
    await gig.save({ session });

    // 2. Update Winning Bid
    bid.status = 'HIRED';
    await bid.save({ session });

    // 3. Reject all other Bids for this Gig
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: 'REJECTED' },
      { session }
    );

    await session.commitTransaction();
    res.json({ message: 'Hired successfully!', gig });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
