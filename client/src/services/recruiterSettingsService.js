// services/recruiterSettingsService.js
import axios from "./axiosInstance";

// Get recruiter settings
export const getRecruiterSettings = () =>
  axios.get("/recruiter/settings", { withCredentials: true });

// Update company details
export const updateCompanyDetails = (payload) =>
  axios.put("/recruiter/settings/company", payload, { withCredentials: true });

// Update recruiter preferences
export const updateRecruiterPreferences = (payload) =>
  axios.put("/recruiter/settings/preferences", payload, {
    withCredentials: true,
  });

// Update password
export const updateRecruiterPassword = (payload) =>
  axios.put("/recruiter/settings/password", payload, { withCredentials: true });

// Upload profile picture
export const uploadRecruiterProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  return axios.post("/recruiter/settings/profile-picture", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Remove profile picture
export const removeRecruiterProfilePicture = () =>
  axios.delete("/recruiter/settings/profile-picture", {
    withCredentials: true,
  });
