// services/recruiterActivityService.js
import axios from "./axiosInstance";

// Get reports made by recruiter
export const getReportsMade = () =>
  axios.get("/recruiter/reports-made", { withCredentials: true });

// Get candidates contacted by recruiter
export const getContactedCandidates = () =>
  axios.get("/recruiter/contacted", { withCredentials: true });
