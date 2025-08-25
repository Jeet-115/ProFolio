// services/invitationService.js
import axios from "./axiosInstance";

// Send an invitation to a candidate
export const sendInvitation = (candidateId, payload) =>
  axios.post(`/invitations/${candidateId}`, payload, {
    withCredentials: true,
  });

// Get all invitations (optional, if you want recruiter to track later)
export const getInvitations = () =>
  axios.get("/invitations", { withCredentials: true });
