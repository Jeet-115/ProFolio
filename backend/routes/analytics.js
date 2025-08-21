import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as analyticsController from "../controllers/analytics.js";

const router = express.Router();

// Protect routes
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(isAuthenticated);

// GET /api/analytics
router.get("/", wrapAsync(analyticsController.getUserAnalytics));

export default router;
