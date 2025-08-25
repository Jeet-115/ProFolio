import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import resumeRoutes from "./routes/resume.js";
import uploadRoutes from "./routes/upload.js";
import templateResumeRoutes from "./routes/templateResume.js";
import templateFilesRouter from "./routes/templateFiles.js";
import portfolioRoutes from "./routes/portfolio.js";
import portfolioTemplateFiles from "./routes/portfolioTemplateFiles.js";
import templatePortfolioRoutes from "./routes/templatePortfolio.js";
import analyticsRoutes from "./routes/analytics.js";
import recruiterDashboardRoutes from "./routes/recruiterDashboardRoutes.js";
import candidateDirectoryRoutes from "./routes/candidateDirectoryRoutes.js";
import candidateProfileRoutes from "./routes/candidateProfileRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import recruiterActionsRoutes from "./routes/recruiterActionsRoutes.js";
import recruiterSettingsRoutes from "./routes/recruiterSettingsRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import "./config/passportConfig.js";

dotenv.config();
const app = express();

// Connect to DB
await connectDB();

// CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.VERCEL_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      sameSite: "Strict",
      secure: false, // set true in production
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", userRoutes);
// Also expose user routes under /api so client axios base (/api) works for logout and admin endpoints
app.use("/api", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/template-resumes", templateResumeRoutes);
app.use("/api/template-files", templateFilesRouter);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/portfolio-templates", portfolioTemplateFiles);
app.use("/api/template-portfolios", templatePortfolioRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recruiter/dashboard", recruiterDashboardRoutes);
app.use("/api/candidates", candidateDirectoryRoutes);
app.use("/api/candidate", candidateProfileRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/recruiter", recruiterActionsRoutes);
app.use("/api/recruiter/settings", recruiterSettingsRoutes);
app.use("/api/admin/recruiters", recruiterRoutes);

// Check
app.get("/", (req, res) => {
  res.send("Backend for Profolio is running!");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
