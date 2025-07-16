import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as templateResumeController from "../controllers/templateResume.js";

const router = express.Router();

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(isAuthenticated);

router
  .route("/")
  .post(wrapAsync(templateResumeController.createTemplateResume))
  .get(wrapAsync(templateResumeController.getTemplateResumes));

router
  .route("/:id")
  .get(wrapAsync(templateResumeController.getTemplateResumeById))
  .put(wrapAsync(templateResumeController.updateTemplateResume))
  .delete(wrapAsync(templateResumeController.deleteTemplateResume));

export default router;
