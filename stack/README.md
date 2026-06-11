# 🔶 Stack Overflow Clone

A full-stack Stack Overflow clone built with **Next.js** (frontend) and **Express.js + MongoDB** (backend). Features real authentication, Q&A functionality with voting, user profiles, and full deployment support.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?logo=express)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Local Development Setup](#-local-development-setup)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Sign up & Login with JWT-based auth, bcrypt password hashing |
| ❓ **Questions** | Ask, view, delete questions with tags |
| 💬 **Answers** | Post and delete answers on questions |
| 👍 **Voting** | Upvote / Downvote questions |
| 🔍 **Search** | Search questions by title and tags |
| 👥 **Users** | Browse all users, view profiles |
| ✏️ **Profile Editing** | Edit your name, about, and skill tags |
| 📱 **Responsive Design** | Pixel-perfect Stack Overflow UI with sidebar, navbar, right sidebar |
| 🏷️ **Tags** | Tag-based categorization of questions |

---

## 🛠 Tech Stack

### Frontend (`/stack`)
- **Next.js 16** (Pages Router)
- **React 19** with TypeScript
- **Tailwind CSS 4** + shadcn/ui components
- **Axios** for API calls
- **Moment.js** for date formatting
- **React Toastify** for notifications

### Backend (`/server`)
- **Express.js 5**
- **MongoDB** with Mongoose 9
- **JWT** for authentication
- **bcrypt.js** for password hashing
- **CORS** enabled

---

## 📁 Project Structure

```
StackOverflow/
├── server/                    # Backend (Express.js API)
│   ├── controller/            # Route handlers
│   │   ├── auth.js            # Signup & Login logic
│   │   ├── users.js           # User CRUD operations
│   │   ├── Questions.js       # Question CRUD + voting
│   │   └── Answers.js         # Answer post & delete
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   ├── auth.js            # User schema
│   │   └── Questions.js       # Question + Answer schema
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── users.js           # User routes
│   │   ├── Questions.js       # Question routes
│   │   └── Answers.js         # Answer routes
│   ├── index.js               # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── stack/                     # Frontend (Next.js)
│   ├── components/ui/         # Reusable UI components
│   │   ├── Navbar.tsx         # Top navigation bar
│   │   ├── sidebar.tsx        # Left sidebar navigation
│   │   ├── RightSideBar.tsx   # Right sidebar (blog/meta)
│   │   └── QuestionDetail.tsx # Full question view
│   ├── context/
│   │   └── authcontext.jsx    # Auth context provider
│   ├── Layout/
│   │   └── Mainlayout.tsx     # Main page layout wrapper
│   ├── lib/
│   │   ├── api.js             # API helper functions
│   │   └── axiosinstance.js   # Axios config with auth interceptor
│   ├── pages/
│   │   ├── index.tsx          # Home page (Top Questions)
│   │   ├── ask/index.tsx      # Ask a Question page
│   │   ├── auth/index.tsx     # Login page
│   │   ├── signup/index.tsx   # Signup page
│   │   ├── questions/         # Questions listing + [id] detail
│   │   ├── users/             # Users listing + [id] profile
│   │   └── tags/index.tsx     # Tags page
│   ├── styles/globals.css
│   ├── package.json
│   └── .env.example
│
├── render.yaml                # Render deployment config (backend)
├── vercel.json                # Vercel deployment config (frontend)
└── README.md
```

---

## 📌 Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git**

---

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/StackOverflow.git
cd StackOverflow
```

### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your MongoDB connection string and JWT secret

# Start the backend dev server
npm run dev
```

The backend will run at **http://localhost:8080**

### 3. Setup Frontend

```bash
# Open a new terminal, navigate to frontend directory
cd stack

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# The default points to http://localhost:8080

# Start the frontend dev server
npm run dev
```

The frontend will run at **http://localhost:3000**

### Quick Start (Both Together)

**Terminal 1 — Backend:**
```bash
cd server && npm install && npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd stack && npm install && npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/signup` | Register new user | ❌ |
| `POST` | `/auth/login` | Login user | ❌ |

### Questions
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/questions/get` | Get all questions | ❌ |
| `GET` | `/questions/get/:id` | Get question by ID | ❌ |
| `POST` | `/questions/Ask` | Post a new question | ✅ |
| `DELETE` | `/questions/delete/:id` | Delete a question | ✅ |
| `PATCH` | `/questions/vote/:id` | Upvote/Downvote a question | ✅ |

### Answers
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `PATCH` | `/answer/post/:id` | Post an answer to a question | ✅ |
| `PATCH` | `/answer/delete/:id` | Delete an answer | ✅ |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/user/getAllUsers` | Get all users | ❌ |
| `GET` | `/user/get/:id` | Get user by ID | ❌ |
| `PATCH` | `/user/update/:id` | Update user profile | ✅ |

---

## 🌐 Deployment

### Backend → Render

1. **Create a new Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add **Environment Variables** in Render dashboard:
   - `MONGODB_URL` — Your MongoDB Atlas connection string
   - `JWT_SECRET` — A strong secret key for JWT tokens
   - `CLIENT_URL` — Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
   - `PORT` — `5000` (or leave for Render to assign)
5. Deploy! Your API will be live at `https://your-api.onrender.com`

> **Note:** The `render.yaml` file in the root enables one-click Blueprint deployment.

### Frontend → Vercel

1. Go to [Vercel](https://vercel.com) and import your GitHub repository
2. Configure:
   - **Root Directory:** `stack`
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
3. Add **Environment Variables** in Vercel dashboard:
   - `NEXT_PUBLIC_BACKEND_URL` — Your Render backend URL (e.g., `https://your-api.onrender.com`)
4. Deploy! Your frontend will be live at `https://your-app.vercel.app`

### Post-Deployment Checklist

- [ ] Backend is running and returns `"Stackoverflow clone is running perfect"` at root URL
- [ ] Set `CLIENT_URL` on Render to your Vercel URL for CORS
- [ ] Set `NEXT_PUBLIC_BACKEND_URL` on Vercel to your Render URL
- [ ] Test signup, login, ask question, post answer, vote flows
- [ ] Verify MongoDB Atlas allows connections from Render IP (whitelist `0.0.0.0/0` for simplicity)

---

## 🔑 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URL` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `my_super_secret_key` |
| `CLIENT_URL` | Frontend URL for CORS (use `*` in dev) | `https://your-app.vercel.app` |

### Frontend (`stack/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL | `http://localhost:8080` |

---

## 📄 License

This project is for educational purposes — a clone of Stack Overflow to learn full-stack development