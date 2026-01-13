
# GigFlow - Freelance Marketplace

GigFlow is a minimal, production-ready freelance marketplace built for the ServiceHive hiring assignment. It allows clients to post gigs and freelancers to bid on them, featuring a robust transactional hiring system.

## 🚀 Tech Stack

- **Frontend:** React 19, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT with HttpOnly Cookies (Secure & XSS-resistant)
- **Architecture:** Atomic Transactions for multi-document updates

## ✨ Key Features

- **Transactional Hiring:** When a client hires a freelancer, the system atomically updates the gig status and rejects all other competing bids using MongoDB Sessions.
- **Role-Based UI:** Dynamic interfaces for Clients (Hirers) and Freelancers (Experts).
- **Human-Centric Design:** Conversational language and Local Currency (INR ₹) implementation.
- **Secure Auth:** JWT session management handled server-side for maximum security.

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
git clone <your-repo>
cd gigflow
npm install
```

### 2. Environment Variables
Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_random_string
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run Locally
```bash
# Start Backend
node server.js

# Start Frontend (in another terminal)
npm run dev
```

## 🌍 Deployment

- **Backend:** Deploy `server.js` to **Render** or **Railway**.
- **Frontend:** Deploy to **Vercel** or **Netlify**.
- **Database:** Use a free **MongoDB Atlas** cluster.

## 🎥 Demo Video Script
Included in the application dashboard under the "Watch Demo" section.
