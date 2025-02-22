import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('/signup', formData);
        // Redirect or show success message after signup
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Signup on Wanderlust</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <TextField
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="mb-6">
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SignUp
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
