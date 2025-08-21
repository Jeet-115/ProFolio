import axios from "./axiosInstance"; // ✅ your custom axios instance

// Fetch analytics for the logged-in user
export const getUserAnalytics = () =>
  axios.get("/analytics", { withCredentials: true });
