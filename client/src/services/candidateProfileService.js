import axios from "./axiosInstance";

// ---------------- CANDIDATE PROFILE ----------------

// 1. Get candidate full profile
export const getCandidateProfile = (id) =>
  axios.get(`/candidate/${id}`, { withCredentials: true });

// 2. Report candidate
export const reportCandidate = (id, reason) =>
  axios.post(`/candidate/${id}/report`, { reason }, { withCredentials: true });
