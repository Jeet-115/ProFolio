import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form submitted");
    setServerError("");
    setSuccess("");
    if (validateForm()) {
      try {
        const res = await axios.post("http://localhost:3000/signup", formData, {
          withCredentials: true,
        });

        setSuccess(res.data.message || "Signup successful!");

        // 👇 Redirect based on role
        let redirectPath = "/dashboard";
        if (res.data.user?.role === "recruiter") {
          redirectPath = "/recruiter/dashboard";
        }

        setTimeout(() => navigate(redirectPath), 1000);
      } catch (err) {
        setServerError(
          err.response?.data?.error || err.message || "Signup failed."
        );
        console.error(err);
      }
    }
  };

  return {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    serverError,
    success,
  };
};

export default useSignUp;
