import User from "../models/user.js";
import mongoose from "mongoose";

// ---------------------- CONTACTED CANDIDATES ----------------------
export const getContactedCandidates = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const recruiter = await User.findById(recruiterId)
      .populate({
        path: "contactedCandidates.candidateId",
        select: "fullName email headline profilePicture skills location",
      })
      .lean();

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter.contactedCandidates || []);
  } catch (error) {
    console.error("Error fetching contacted candidates:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- REPORTS MADE BY RECRUITER ----------------------
export const getReportsMade = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const recruiter = await User.findById(recruiterId)
      .populate({
        path: "reportsMade.candidateId",
        select: "fullName email headline profilePicture skills location",
      })
      .lean();

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter.reportsMade || []);
  } catch (error) {
    console.error("Error fetching reports made:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- REPORTS RECEIVED (for candidate's perspective) ----------------------
export const getReportsReceived = async (req, res) => {
  try {
    const candidateId = req.user._id;

    const candidate = await User.findById(candidateId)
      .populate({
        path: "reportsReceived.recruiterId",
        select: "fullName email profilePicture",
      })
      .lean();

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(candidate.reportsReceived || []);
  } catch (error) {
    console.error("Error fetching reports received:", error);
    res.status(500).json({ message: "Server error" });
  }
};
