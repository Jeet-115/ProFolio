import axios from "./axiosInstance"; // ✅ reuse configured axios

// ---------------- CANDIDATE DIRECTORY ----------------

// Get all candidates with optional filters
export const getCandidates = (filters = {}) => {
  // Remove empty filters before sending
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
  );

  return axios.get("/candidates", {
    params: cleanFilters,
    withCredentials: true,
  });
};

// Get single candidate profile by ID
export const getCandidateById = (candidateId) =>
  axios.get(`/candidates/${candidateId}`, { withCredentials: true });

// Bookmark candidate
export const bookmarkCandidate = (candidateId, notes = "") =>
  axios.post(
    `/candidates/${candidateId}/bookmark`,
    { notes },
    { withCredentials: true }
  );

// Contact candidate
// export const contactCandidate = (candidateId, method = "message") =>
//   axios.post(
//     `/candidates/${candidateId}/contact`,
//     { method },
//     { withCredentials: true }
//   );
