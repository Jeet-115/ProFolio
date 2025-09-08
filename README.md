# ProFolio 🚀  
A full-stack **MERN** web application that empowers **candidates, recruiters, and admins** through a centralized platform for resume building, portfolio creation, recruitment management, and analytics.  

---

## 📖 Table of Contents  
1. [Overview](#overview)  
2. [Features](#features)  
   - [User Dashboard](#user-dashboard)  
   - [Recruiter Dashboard](#recruiter-dashboard)  
   - [Admin Dashboard](#admin-dashboard)  
3. [Tech Stack](#tech-stack)  
4. [Directory Structure](#directory-structure)  
5. [Installation & Setup](#installation--setup)  
6. [Environment Variables](#environment-variables)  
7. [Usage](#usage)  
8. [Documentation](#documentation)  
9. [Contributors](#contributors)  
10. [License](#license)  

---

## 📌 Overview  
**ProFolio** is a one-stop platform that helps candidates **build resumes and portfolios**, recruiters **search and manage candidates**, and admins **monitor the system**.  

- 📝 Create and manage **resumes** using an integrated **TinyMCE editor**.  
- 🌐 Build modern **portfolios** with ready-to-use templates.  
- 👔 Recruiters can **browse, bookmark, and invite** candidates.  
- 📊 Admins can **analyze platform usage** and manage users, recruiters, and templates.  
- 🔐 Supports **secure authentication** (local, Google, GitHub).  

---

## ✨ Features  

### 👤 User Dashboard  
- Register/Login (local + Google + GitHub)  
- Build resumes with TinyMCE editor  
- Save to cloud (Cloudinary integration for file uploads)  
- Manage multiple resumes (**My Resumes**)  
- Create and customize portfolios with templates  
- View analytics about profile/resume/portfolio activity  
- Update user settings and preferences  

### 🧑‍💼 Recruiter Dashboard  
- Recruiter login & signup  
- Browse/search candidates from a **candidate directory**  
- View detailed candidate profiles  
- Bookmark favorite candidates  
- Send invitations to connect  
- Manage recruiter profile & settings  

### 🛠️ Admin Dashboard  
- Monitor overall platform analytics (users, recruiters, resumes, portfolios)  
- Manage users and recruiters  
- Manage available resume & portfolio templates  
- Control platform-wide settings  

---

## 🛠 Tech Stack  

**Frontend (Client)**  
- React (Vite)  
- TailwindCSS + shadcn/ui + Framer Motion  
- Axios (API calls)  
- Lucide-react (icons)  

**Backend (Server)**  
- Node.js + Express  
- MongoDB + Mongoose  
- Passport.js (local, Google, GitHub authentication)  
- Cloudinary (resume/portfolio file storage)  
- Nodemailer (email invitations)  

**Other Tools**  
- ESLint (linting)  
- Vercel (frontend deployment)  
- Render/Heroku (backend deployment, configurable)  

---

## 📂 Directory Structure  

```
jeet-115-profolio/
├── backend/              # Node.js + Express server
│   ├── config/           # DB, Passport, Cloudinary, Email
│   ├── controllers/      # Business logic (users, recruiters, resumes, etc.)
│   ├── middleware/       # Middlewares (auth, multer)
│   ├── models/           # Mongoose models
│   ├── portfolio-templates/ # Portfolio HTML/CSS/JS templates
│   ├── routes/           # Express routes
│   ├── templates/        # Resume templates
│   └── utils/            # Error handling helpers
└── client/               # React frontend
    ├── Components/       # Reusable UI components
    ├── Screens/          # Pages (User, Recruiter, Admin)
    ├── layouts/          # Dashboard & layout wrappers
    ├── services/         # API service files
    ├── protection/       # Route protection components
    └── theme/            # Custom theme configs
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Jeet-115/profolio.git
cd jeet-115-profolio
```

### 2️⃣ Install dependencies  
- Backend  
```bash
cd backend
npm install
```

- Frontend  
```bash
cd ../client
npm install
```

### 3️⃣ Run the project  
- Backend  
```bash
cd backend
npm run dev
```

- Frontend  
```bash
cd client
npm run dev
```

---

## 🔑 Environment Variables  

Create a `.env` file in the **backend/** directory with the following:  

```env
PORT=5000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## ▶️ Usage  

### For Users:  
1. Sign up / Log in  
2. Create resumes with **Resume Builder**  
3. Save resumes & view in **My Resumes**  
4. Create portfolios with templates  
5. Track activity in **User Analytics**  

### For Recruiters:  
1. Sign up as recruiter  
2. Browse candidates in **Candidate Directory**  
3. Bookmark interesting profiles  
4. Send invitations  
5. Manage recruiter settings  

### For Admins:  
1. Log in with admin role  
2. View **Admin Analytics**  
3. Manage users, recruiters, resumes, portfolios  
4. Control templates and system settings  

---

## 📚 Documentation  
The project is supported by additional documentation:  
- 📄 **Testing Report** (manual testing logs, test results summary)  
- 📄 **Research Paper** (background, methodology, results)  
- 📊 **Diagrams** (use case, architecture, workflows)  

---

## 👨‍👩‍👦 Contributors  
- **Jeet**  
- **Dharmik**  
- **Maanav**  
- **Dev**  

---

## 📜 License  
This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute with attribution.  

---
