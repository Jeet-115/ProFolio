import axios from "./axiosInstance";

// fetch list of all available portfolio templates
export const getPortfolioTemplateFiles = () => axios.get("/portfolio-templates");

// fetch a single portfolio template schema by id
export const getPortfolioTemplateFileById = (id) =>
  axios.get(`/portfolio-templates/${id}`);