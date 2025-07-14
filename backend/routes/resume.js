import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as resumeController from "../controllers/resume.js";

const router = express.Router();

// Auth middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(isAuthenticated); // all routes below are protected

router
  .route("/")
  .post(wrapAsync(resumeController.createResume))
  .get(wrapAsync(resumeController.getUserResumes));

router
  .route("/:id")
  .get(wrapAsync(resumeController.getResumeById))
  .put(wrapAsync(resumeController.updateResume))
  .delete(wrapAsync(resumeController.deleteResume));

export default router;
