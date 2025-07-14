import axios from "./axiosInstance";

// Resume operations
export const saveResume = (data) => axios.post("/resumes", data);
export const updateResume = (id, data) => axios.put(`/resumes/${id}`, data);
export const getResume = (id) => axios.get(`/resumes/${id}`);
export const getUserResumes = () => axios.get("/resumes");
export const deleteResume = (id) => axios.delete(`/resumes/${id}`);

// 👇 New: Upload image to Cloudinary via backend
export const uploadResumeImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  return response.data.url;
};
