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
app.use("/api/resumes", resumeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/template-resumes", templateResumeRoutes);
app.use("/api/template-files", templateFilesRouter);

// Check
app.get("/", (req, res) => {
  res.send("Backend for Profolio is running!");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
