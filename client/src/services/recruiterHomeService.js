import axios from "./axiosInstance"; // ✅ using your configured axios

// ---------------- DASHBOARD HOME ----------------

// 1. Get recruiter profile
export const getRecruiterProfile = () =>
  axios.get("/recruiter/dashboard/profile", { withCredentials: true });

// 2. Get recruiter quick stats
export const getRecruiterStats = () =>
  axios.get("/recruiter/dashboard/stats", { withCredentials: true });

// 3. Get recently viewed candidates
export const getRecentCandidates = () =>
  axios.get("/recruiter/dashboard/recent-candidates", { withCredentials: true });

// 4. Get suggested candidates
export const getSuggestedCandidates = () =>
  axios.get("/recruiter/dashboard/suggested-candidates", { withCredentials: true });
