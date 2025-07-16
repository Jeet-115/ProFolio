import axios from "./axiosInstance";

// CRUD for template resumes
export const createTemplateResume = (data) => axios.post("/template-resumes", data);
export const getTemplateResumes = () => axios.get("/template-resumes");
export const getTemplateResumeById = (id) => axios.get(`/template-resumes/${id}`);
export const updateTemplateResume = (id, data) => axios.put(`/template-resumes/${id}`, data);
export const deleteTemplateResume = (id) => axios.delete(`/template-resumes/${id}`);
