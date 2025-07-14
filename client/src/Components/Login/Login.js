import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";
import { setCredentials } from "../../redux/authSlice";

const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
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
    e.preventDefault(); // ✅ prevent form reload
    if (!validateForm()) return;

    try {
      const data = await loginUser(formData);
      dispatch(setCredentials({ user: data.user }));
      setSuccess(data.message || "Login successful!");
      navigate(data.redirect || "/dashboard"); // ✅ go immediately
    } catch (err) {
      setServerError(
        err.response?.data?.error || err.message || "Login failed."
      );
      console.error("Login error:", err);
    }
  };

  return { formData, errors, handleChange, handleSubmit, serverError, success };
};

export default useLogin;
