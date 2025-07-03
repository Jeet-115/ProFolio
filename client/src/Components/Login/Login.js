import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError("");
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    if (validateForm()) {
      try {
        const res = await axios.post("http://localhost:3000/login", formData);
        setSuccess(res.data.message || "Login successful!");
        setTimeout(() => navigate("/"), 1000); // Redirect to home after 1s
      } catch (err) {
        setServerError(
          err.response?.data?.error || err.message || "Login failed."
        );
        console.error(err);
      }
    }
  };

  return { formData, errors, handleChange, handleSubmit, serverError, success };
};

export default useLogin;
