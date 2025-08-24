import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as recruiterDashboardController from "../controllers/recruiterDashboardController.js";

const router = express.Router();

// Recruiter Dashboard Home APIs
router.get("/profile", wrapAsync(recruiterDashboardController.getRecruiterProfile));
router.get("/stats", wrapAsync(recruiterDashboardController.getRecruiterStats));
router.get("/recent-candidates", wrapAsync(recruiterDashboardController.getRecentCandidates));
router.get("/suggested-candidates", wrapAsync(recruiterDashboardController.getSuggestedCandidates));

export default router;
