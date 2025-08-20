import axios from "./axiosInstance";

// ✅ Create and save a new portfolio template entry
export const createTemplatePortfolio = (data) =>
  axios.post("/template-portfolios", data);

// ✅ Get all saved portfolio templates for the logged-in user
export const getTemplatePortfolios = () => axios.get("/template-portfolios");

// ✅ Get a single saved portfolio template by ID
export const getTemplatePortfolioById = (id) =>
  axios.get(`/template-portfolios/${id}`);

// ✅ Update a saved portfolio template
export const updateTemplatePortfolio = (id, data) =>
  axios.put(`/template-portfolios/${id}`, data);

// ✅ Delete a saved portfolio template
export const deleteTemplatePortfolio = (id) =>
  axios.delete(`/template-portfolios/${id}`);
