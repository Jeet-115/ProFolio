// src/services/adminUserService.js
import axios from "./axiosInstance"; // ✅ using your pre-configured axios instance

// ---------------- ADMIN: USERS ----------------

// Get all users
export const getAllUsers = () =>
  axios.get("/admin/users", { withCredentials: true });

// Update a user's role
export const updateUserRole = (userId, role) =>
  axios.put(`/admin/users/${userId}/role`, { role }, { withCredentials: true });

// Delete a user
export const deleteUserById = (userId) =>
  axios.delete(`/admin/users/${userId}`, { withCredentials: true });

// Get user reports (received + made)
export const getUserReports = (userId) =>
  axios.get(`/admin/users/${userId}/reports`, { withCredentials: true });
