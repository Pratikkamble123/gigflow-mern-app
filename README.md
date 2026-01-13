
# GigFlow – Mini Freelance Marketplace Platform

GigFlow is a full-stack freelance marketplace where users can post jobs (Gigs) and freelancers can apply (Bids).  
Clients can review bids and hire one freelancer using a secure hiring workflow.

This project was built as part of the **ServiceHive Full Stack Development Internship Assignment**.

---


## 🛠 Tech Stack

- Frontend: React (Vite) + TypeScript + Tailwind CSS  
- Backend: Node.js + Express.js  
- Database: MongoDB (Mongoose)  
- Authentication: JWT with HttpOnly Cookies  
- State Management: Context API / Redux Toolkit  

---

## 🔑 Core Features

- Secure user authentication (Signup & Login)  
- Post and browse gigs  
- Search gigs by title  
- Bid on gigs as a freelancer  
- View all bids for your posted gig  
- Hire a freelancer  
- Automatic rejection of other bids  
- Role-free system (any user can be client or freelancer)  

---

## 🧠 Hiring Workflow

1. A user posts a gig  
2. Other users submit bids  
3. The gig owner reviews bids  
4. The owner clicks **Hire** on one bid  
5. The gig becomes **assigned**  
6. The selected freelancer is **hired**  
7. All other bids are **rejected**

This logic is handled atomically to ensure data consistency.

---

## 🗂️ API Endpoints

| Method | Endpoint |
|-------|---------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/gigs |
| POST | /api/gigs |
| POST | /api/bids |
| GET | /api/bids/:gigId |
| PATCH | /api/bids/:bidId/hire |

---

## 🗄 Database Models

**User**
- name  
- email  
- password  

**Gig**
- title  
- description  
- budget  
- ownerId  
- status (open, assigned)  

**Bid**
- gigId  
- freelancerId  
- message  
- status (pending, hired, rejected)  

---

## ⚙️ Setup Instructions

1. Clone the repository
```bash
git clone <repo-url>
````

2. Install dependencies

```bash
npm install
```

3. Add environment variables
   Create a `.env` file using `.env.example`

4. Start backend

```bash
npm run server
```

5. Start frontend

```bash
npm run dev
```

---

## 🔐 Environment Variables

See `.env.example` for required keys:

* MONGO_URI
* JWT_SECRET
* FRONTEND_URL

---

## 📌 Author

**Pratik Kamble**
Full Stack Developer Intern Applicant
ServiceHive – GigFlow Assignment
