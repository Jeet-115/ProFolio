import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRecruiterSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "recruiter", // Fixed as recruiter
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
    
    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Recruiter signup form submitted");
    setServerError("");
    setSuccess("");
    
    if (validateForm()) {
      try {
        console.log('Sending formData to backend:', formData); // Debug log
        const res = await axios.post("http://localhost:3000/signup", formData, {
          withCredentials: true,
        });

        console.log('Recruiter signup response:', res.data); // Debug log
        setSuccess(res.data.message || "Recruiter account created successfully!");
        
        // Use redirect URL from server response
        const redirectUrl = res.data.redirect || "/recruiter/dashboard";
        console.log('Form signup - Redirecting to:', redirectUrl); // Debug log
        setTimeout(() => navigate(redirectUrl), 1500);
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

export default useRecruiterSignUp;
