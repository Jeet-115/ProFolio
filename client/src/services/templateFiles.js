import axios from "./axiosInstance";

// fetch list of all available templates
export const getTemplateFiles = () => axios.get("/template-files");

// fetch a single template schema by id
export const getTemplateFileById = (id) => axios.get(`/template-files/${id}`);

// render and download a template by id; format can be 'pdf', 'tex', or 'txt'
export const renderTemplate = (id, fields, format = "pdf") =>
  axios.post(
    `/template-files/render/${id}?format=${format}`,
    { fields },
    {
      responseType: "blob",
    }
  );
