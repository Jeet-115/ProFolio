import express from "express";
import {
  getRecruiterSettings,
  getCompanyDetails,
  updateCompanyDetails,
  getRecruiterPreferences,
  updateRecruiterPreferences,
  updatePassword,
  uploadRecruiterProfilePicture,
  removeRecruiterProfilePicture,
} from "../controllers/recruiterSettingsController.js";
import { uploadProfilePicture } from "../middleware/multer.js";

const router = express.Router();

// Get all settings
router.get("/", getRecruiterSettings);

// Company details
router.get("/company", getCompanyDetails);
router.put("/company", updateCompanyDetails);

// Preferences
router.get("/preferences", getRecruiterPreferences);
router.put("/preferences", updateRecruiterPreferences);

// Password / Security
router.put("/password", updatePassword);

// Profile Picture
router.post(
  "/profile-picture",
  uploadProfilePicture.single("profilePicture"),
  uploadRecruiterProfilePicture
);
router.delete("/profile-picture", removeRecruiterProfilePicture);

export default router;
