import express from "express";
import {
  getCompanyDetails,
  updateCompanyDetails,
  getRecruiterPreferences,
  updateRecruiterPreferences,
  updatePassword,
} from "../controllers/recruiterSettingsController.js";

const router = express.Router();

// Company details
router.get("/company", getCompanyDetails);
router.put("/company", updateCompanyDetails);

// Preferences
router.get("/preferences", getRecruiterPreferences);
router.put("/preferences", updateRecruiterPreferences);

// Password / Security
router.put("/password", updatePassword);

export default router;
