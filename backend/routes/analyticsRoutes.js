import express from "express";
import {
  getUserAnalytics,
  getRecruiterAnalytics,
  getAdminAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

// Admin-only guard
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user?.role === "admin") return next();
  return res.status(403).json({ error: "Forbidden" });
};

// ---- Analytics Management ----
router.get("/user", isAdmin, getUserAnalytics);
router.get("/recruiter", isAdmin, getRecruiterAnalytics);
router.get("/admin", isAdmin, getAdminAnalytics);

export default router;
