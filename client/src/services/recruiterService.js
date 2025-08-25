import axios from "./axiosInstance";

// ---------------- RECRUITER MANAGEMENT (Admin) ----------------

// Fetch all recruiters
export const getAllRecruiters = () =>
  axios.get("/admin/recruiters", { withCredentials: true });

// Fetch recruiter details
export const getRecruiterById = (id) =>
  axios.get(`/admin/recruiters/${id}`, { withCredentials: true });

// Get reports recruiter has made
export const getRecruiterReportsMade = (id) =>
  axios.get(`/admin/recruiters/${id}/reports`, { withCredentials: true });

// 🔹 Get bookmarks recruiter made
export const getRecruiterBookmarks = (id) =>
  axios.get(`/admin/recruiters/${id}/bookmarks`, { withCredentials: true });

// 🔹 Get contacted candidates recruiter reached out to
export const getRecruiterContacted = (id) =>
  axios.get(`/admin/recruiters/${id}/contacted`, { withCredentials: true });
