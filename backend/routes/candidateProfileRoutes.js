import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as candidateProfileController from "../controllers/candidateProfileController.js";

const router = express.Router();

// 📌 Candidate Profile API
router.get("/:id", wrapAsync(candidateProfileController.getCandidateProfile));

// 📌 Report Candidate
router.post("/:id/report", wrapAsync(candidateProfileController.reportCandidate));

export default router;
