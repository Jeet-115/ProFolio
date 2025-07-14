import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../service/authService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";

const useSignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
    setServerError("");
    setSuccess("");
    if (validateForm()) {
      try {
        const data = await signupUser(formData);
        setSuccess(data.message || "Signup successful!");
        dispatch(setCredentials({ user: data.user }));
        navigate(data.redirect || "/dashboard"); // ✅ navigate directly
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
