import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";

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
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", userRoutes);

// Check
app.get("/", (req, res) => {
  res.send("Backend for Profolio is running!");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});