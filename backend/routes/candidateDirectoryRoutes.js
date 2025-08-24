import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as candidateDirectoryController from "../controllers/candidateDirectoryController.js";

const router = express.Router();

// Candidate Directory APIs
router.get("/", wrapAsync(candidateDirectoryController.getCandidates));

router.post(
  "/:id/bookmark",
  wrapAsync(candidateDirectoryController.bookmarkCandidate)
);

export default router;
