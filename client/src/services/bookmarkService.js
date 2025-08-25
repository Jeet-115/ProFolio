import axios from "./axiosInstance";

// ---------------- BOOKMARKS ----------------

// 1. Get all bookmarks
export const getBookmarks = () =>
  axios.get("/bookmarks", { withCredentials: true });

// 2. Add candidate to bookmarks
export const addBookmark = (candidateId, notes = "") =>
  axios.post(`/bookmarks/${candidateId}`, { notes }, { withCredentials: true });

// 3. Update notes for a bookmark
export const updateBookmarkNotes = (bookmarkId, notes) =>
  axios.put(`/bookmarks/${bookmarkId}`, { notes }, { withCredentials: true });

// 4. Remove bookmark
export const removeBookmark = (bookmarkId) =>
  axios.delete(`/bookmarks/${bookmarkId}`, { withCredentials: true });

// 5. Export as CSV
export const exportBookmarksCSV = () =>
  axios.get("/bookmarks/export/csv", {
    withCredentials: true,
    responseType: "blob", // file download
  });

// 6. Export as PDF
export const exportBookmarksPDF = () =>
  axios.get("/bookmarks/export/pdf", {
    withCredentials: true,
    responseType: "blob", // file download
  });
