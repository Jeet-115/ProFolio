import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { sendInvitation } from "../controllers/invitationController.js";

const router = express.Router();

// 📩 Send an invitation to candidate
router.post("/:candidateId", wrapAsync(sendInvitation));

export default router;
