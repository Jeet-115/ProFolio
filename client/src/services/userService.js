import axios from "./axiosInstance"; // ✅ using your pre-configured axios instance

// ---------------- PROFILE ----------------

// Get logged-in user profile
export const getUserProfile = () =>
  axios.get("/me", { withCredentials: true });

// Update profile info (name, username, bio, pic, social links)
export const updateUserProfile = (data) =>
  axios.put("/me", data, { withCredentials: true });

// Remove profile picture
export const removeProfilePicture = () =>
  axios.delete("/me/profile-picture", { withCredentials: true });

// ---------------- SETTINGS ----------------

// Update preferences (theme, notifications, privacy)
export const updateUserPreferences = (preferences) =>
  axios.put("/me/preferences", { preferences }, { withCredentials: true });

// Delete own account
export const deleteMyAccount = () =>
  axios.delete("/me", { withCredentials: true });
