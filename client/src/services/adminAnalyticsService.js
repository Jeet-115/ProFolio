import axios from "./axiosInstance";

// ---------------- ANALYTICS MANAGEMENT (Admin) ----------------

// 🔹 Get user analytics
export const getUserAnalytics = () =>
  axios.get("/admin/analytics/user", { withCredentials: true });

// 🔹 Get recruiter analytics
export const getRecruiterAnalytics = () =>
  axios.get("/admin/analytics/recruiter", { withCredentials: true });

// 🔹 Get admin-level analytics
export const getAdminAnalytics = () =>
  axios.get("/admin/analytics/admin", { withCredentials: true });
