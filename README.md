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

- 📝 Create and manage **resumes** either through the integrated **Resume Builder** or by choosing from ready-made **templates**, then organize them in **My Resumes** with options to edit or delete.  
- 🌐 Build **portfolios** using the **Portfolio Builder** or select from available **portfolio templates**, then manage them in **My Portfolio** with edit/delete functionality.  
- 📊 View detailed **analytics** about resume, portfolio, and profile activity.  
- 👤 Update your **candidate profile**, including personal info, social links, email preferences, and privacy settings for resume/portfolio/profile visibility.    
- 👔 Recruiters can **browse, contact, report, bookmark, and invite** candidates.  
- 📊 Admins can **analyze platform usage** and manage users, recruiters, and templates.  
- 🔐 Supports **secure authentication** (local, Google, GitHub).  

---

## ✨ Features  

### 👤 User Dashboard  
- Register/Login (local + Google + GitHub)  
- Create **resumes** either through the integrated **Resume Builder** or by choosing from **templates**  
- Manage resumes in **My Resumes** with options to edit or delete  
- Create **portfolios** using the **Portfolio Builder** or by selecting from **portfolio templates**  
- Manage portfolios in **My Portfolio** with options to edit or delete  
- Save resume/portfolio data securely to the cloud (Cloudinary integration for file uploads)  
- View detailed **analytics** for resume, portfolio, and profile activity  
- Update **candidate profile**, including personal details, social links, email preferences, and privacy settings for resume/portfolio/profile visibility  

### 🧑‍💼 Recruiter Dashboard  
- Recruiter login & signup  
- Browse/search candidates from a **candidate directory**  
- View detailed candidate profiles  
- Bookmark favorite candidates and get list of them  
- Report suspicious candidates
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
- **React (Vite)** – core frontend framework  
- **React Router DOM** – client-side routing  
- **Redux Toolkit** + **React Redux** – state management  
- **TailwindCSS** + **shadcn/ui** + **Framer Motion** – UI styling and animations  
- **MUI (Material UI)** + **@emotion/styled / @emotion/react** – UI components & styling  
- **Styled-components** – CSS-in-JS styling  
- **Axios** – API calls  
- **Lucide-react**, **React Icons** – icon libraries  
- **Recharts** – charts and data visualization  
- **TinyMCE React** – rich text editor for resume builder  
- **Monaco Editor** – advanced code editor integration (if required for templates)  
- **html2canvas**, **html2pdf.js**, **jsPDF** – PDF export and print functionality  
- **date-fns** – date formatting utilities  
- **React Hot Toast** – toast notifications  

**Backend (Server)**  
- **Node.js + Express** – core backend framework  
- **MongoDB + Mongoose** – database and ODM  
- **Passport.js** – authentication  
  - Local strategy  
  - Google OAuth 2.0  
  - GitHub OAuth 2.0  
  - Passport-local-mongoose integration  
- **Bcrypt / Bcryptjs** – password hashing  
- **Express-session + Connect-flash** – session management and flash messages  
- **Cookie-parser, CORS, Body-parser** – middleware for requests, cookies, and cross-origin handling  
- **Cloudinary + Multer + Multer-storage-cloudinary** – file uploads and media storage  
- **Nodemailer** – email invitations and notifications  
- **PDFKit** – PDF generation  
- **Puppeteer** – HTML-to-PDF rendering for resumes/portfolios  
- **Json2csv** – CSV export functionality  
- **Fs-extra, Tmp** – file system utilities  

**Other Tools & DevOps**  
- **dotenv** – environment variable management  
- **ESLint** – linting and code style enforcement  
- **Vercel** – frontend deployment  
- **Render/Heroku** – backend deployment (configurable)  
- **GitHub** – version control and collaboration    

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

### Backend (`/backend/.env`)  

```env
# Environment
NODE_ENV=production
PORT=3000

# Database
ATLASDB_URL=your_mongodb_connection_string

# Session
SESSION_SECRET=your_session_secret

# Client URLs
CLIENT_URL=https://pro-folio-smoky.vercel.app/
CLIENT_URLS=https://pro-folio-smoky.vercel.app/
VERCEL_URL=https://pro-folio-smoky.vercel.app/

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=your_github_callback_url

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=/auth/google/callback
```
### Frontend (`/client/.env`)  

```env
# Backend API base URL
VITE_API_BASE_URL=http://localhost:3000/api   # or your deployed backend URL

# TinyMCE Editor API Key
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

---

## ▶️ Usage  

### For Users  
1. Sign up / Log in (local, Google, GitHub)  
2. Create **resumes** using the **Resume Builder** or choose from **templates**  
3. Manage resumes in **My Resumes** (edit or delete)  
4. Create **portfolios** using the **Portfolio Builder** or select from **templates**  
5. Manage portfolios in **My Portfolio** (edit or delete)  
6. Save resume/portfolio data securely to the cloud  
7. View detailed insights in **User Analytics**  
8. Update **candidate profile** (personal details, social links, email preferences, privacy settings for resume/portfolio/profile visibility)  

### For Recruiters  
1. Sign up / Log in as recruiter  
2. Browse and search candidates in the **Candidate Directory**  
3. View detailed candidate profiles  
4. Bookmark favorite candidates for quick access  
5. Report suspicious or inappropriate candidates  
6. Send invitations to connect  
7. Manage recruiter profile & settings  

### For Admins  
1. Log in with admin role  
2. Monitor **platform analytics** (users, recruiters, resumes, portfolios)  
3. Manage users and recruiters  
4. Manage available **resume & portfolio templates**  
5. Control platform-wide settings  
 

---

## 📚 Documentation  

The project is supported by comprehensive documentation resources:  

- 📄 **Project Report** – complete project write-up (problem statement, design, implementation, results)  
- 📄 **Research Paper** – academic research covering background, methodology, and findings  
- 📄 **Testing Report** – manual testing logs and test results summary  
- 📄 **Project Code Documentation** – inline documentation for frontend and backend codebase  
- 📊 **Diagrams** – visual representations of system design and flow:  
  - Use Case Diagrams  (Whimsical)
  - Architecture Diagrams  (Whimsical)
  - Workflow Diagrams  (Whimsical)
  - Data Flow Diagrams (Whimsical)  
  - UI/UX Designs (Figma)    

---

## 👨‍👩‍👦 Contributors  
- **Jeet**  
- **Dharmik**  
- **Maanav**  
- **Dev**  

---

## 📜 License  

This project is licensed under the [MIT License](./LICENSE).  
You are free to use, modify, and distribute this project with attribution.   

---
