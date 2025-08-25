import express from "express";
import {
  getContactedCandidates,
  getReportsMade,
  getReportsReceived,
} from "../controllers/recruiterActionsController.js";

const router = express.Router();

// recruiter routes
router.get("/contacted", getContactedCandidates);
router.get("/reports-made", getReportsMade);

// candidate route
router.get("/reports-received", getReportsReceived);

export default router;
