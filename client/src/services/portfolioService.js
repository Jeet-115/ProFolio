// portfolioService.js
import axios from "./axiosInstance";  // must be your custom one, not "axios"

export const createPortfolio = (data) =>
  axios.post("/portfolio", data, { withCredentials: true }); // extra safety
export const updatePortfolio = (id, data) =>
  axios.put(`/portfolio/${id}`, data, { withCredentials: true });
export const getPortfolioById = (id) =>
  axios.get(`/portfolio/${id}`, { withCredentials: true });
export const getUserPortfolios = () =>
  axios.get("/portfolio", { withCredentials: true });
export const deletePortfolio = (id) =>
  axios.delete(`/portfolio/${id}`, { withCredentials: true });
