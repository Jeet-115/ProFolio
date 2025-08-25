import express from "express";
import {
  getAllRecruiters,
  getRecruiterById,
  getRecruiterReportsMade,
  getRecruiterBookmarks,
  getRecruiterContacted,
} from "../controllers/recruiterController.js";

const router = express.Router();

// Admin-only guard
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user?.role === "admin") return next();
  return res.status(403).json({ error: "Forbidden" });
};

// ---- Recruiter Management ----
router.get("/", isAdmin, getAllRecruiters);
router.get("/:id", isAdmin, getRecruiterById);
router.get("/:id/reports", isAdmin, getRecruiterReportsMade);
router.get("/:id/bookmarks", isAdmin, getRecruiterBookmarks);
router.get("/:id/contacted", isAdmin, getRecruiterContacted);


export default router;
