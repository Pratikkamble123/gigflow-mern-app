
# Deployment Guide

Follow these steps to take GigFlow live.

### Phase 1: MongoDB Atlas (Database)
1. Create a free account at [mongodb.com](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster and a Database User.
3. Under "Network Access", allow access from `0.0.0.0/0` (for Render compatibility).
4. Copy your Connection String.

### Phase 2: Render (Backend)
1. Link your GitHub repo to [Render](https://render.com).
2. Create a "Web Service".
3. Set Build Command: `npm install`.
4. Set Start Command: `node server.js`.
5. Add your `.env` variables in the Render Dashboard.

### Phase 3: Vercel (Frontend)
1. Link your GitHub repo to [Vercel](https://vercel.com).
2. Vercel will auto-detect Vite.
3. Add Environment Variable: `VITE_API_URL` pointing to your Render URL.
4. Deploy!
