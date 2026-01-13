
import { User, Gig, Bid, UserRole, GigStatus, BidStatus } from '../types.ts';

// Mock DB Initial State - Human style
const INITIAL_GIGS: Gig[] = [
  {
    id: 'g1',
    title: 'Need a cool landing page for my shop',
    description: 'Hey! I am starting a small business and need a simple, clean website. I have a rough design but need someone who knows React and Tailwind to actually build it. Please reach out if you are free!',
    budget: 15000,
    clientId: 'u1',
    clientName: 'Alice Johnson',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'g2',
    title: 'Help me with my app backend',
    description: 'My mobile app is almost ready but the database part is driving me crazy. Need a Node.js expert to help me set up the API and make sure users can log in securely. Let me know your rates!',
    budget: 45000,
    clientId: 'u1',
    clientName: 'Alice Johnson',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const INITIAL_BIDS: Bid[] = [
  {
    id: 'b1',
    gigId: 'g1',
    freelancerId: 'u2',
    freelancerName: 'Bob Smith',
    amount: 12000,
    message: 'Hey Alice! I just finished a similar project last month. I can definitely help you with this. Let me know when you want to chat!',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  }
];

// Helper to interact with Local Storage as a DB
const getDB = () => {
  const db = localStorage.getItem('gigflow_db');
  if (db) return JSON.parse(db);
  const initial = { gigs: INITIAL_GIGS, bids: INITIAL_BIDS };
  localStorage.setItem('gigflow_db', JSON.stringify(initial));
  return initial;
};

const saveDB = (data: any) => {
  localStorage.setItem('gigflow_db', JSON.stringify(data));
};

export const getGigs = async (): Promise<Gig[]> => {
  return getDB().gigs;
};

export const getGigById = async (id: string): Promise<Gig | undefined> => {
  return getDB().gigs.find((g: Gig) => g.id === id);
};

export const createGig = async (gigData: Partial<Gig>): Promise<Gig> => {
  const db = getDB();
  const newGig: Gig = {
    id: `g${Date.now()}`,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    ...gigData as any
  };
  db.gigs.unshift(newGig);
  saveDB(db);
  return newGig;
};

export const getBidsForGig = async (gigId: string): Promise<Bid[]> => {
  return getDB().bids.filter((b: Bid) => b.gigId === gigId);
};

export const placeBid = async (bidData: Partial<Bid>): Promise<Bid> => {
  const db = getDB();
  const newBid: Bid = {
    id: `b${Date.now()}`,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    ...bidData as any
  };
  db.bids.push(newBid);
  saveDB(db);
  return newBid;
};

export const hireFreelancer = async (bidId: string): Promise<{ gig: Gig; bids: Bid[] }> => {
  const db = getDB();
  
  const bidIndex = db.bids.findIndex((b: Bid) => b.id === bidId);
  if (bidIndex === -1) throw new Error("Bid not found");
  
  const selectedBid = db.bids[bidIndex];
  const gigId = selectedBid.gigId;
  const gigIndex = db.gigs.findIndex((g: Gig) => g.id === gigId);
  
  if (db.gigs[gigIndex].status === 'ASSIGNED') {
    throw new Error("Gig already assigned");
  }

  // Update selected bid
  db.bids[bidIndex].status = 'HIRED';

  // Update gig
  db.gigs[gigIndex].status = 'ASSIGNED';
  db.gigs[gigIndex].hiredFreelancerId = selectedBid.freelancerId;

  // Update all other bids for this gig to REJECTED
  db.bids = db.bids.map((b: Bid) => {
    if (b.gigId === gigId && b.id !== bidId) {
      return { ...b, status: 'REJECTED' };
    }
    return b;
  });

  saveDB(db);
  return { 
    gig: db.gigs[gigIndex], 
    bids: db.bids.filter((b: Bid) => b.gigId === gigId) 
  };
};

export const register = async (name: string, email: string, role: UserRole): Promise<User> => {
  return { id: `u${Date.now()}`, name, email, role };
};
