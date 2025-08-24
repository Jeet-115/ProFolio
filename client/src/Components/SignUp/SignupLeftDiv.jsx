import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useSignUp from "./SignUp";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const fadeInLeft = (delay) => ({
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay },
});

const SignupLeftDiv = () => {
  const {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    serverError,
    success,
  } = useSignUp();

  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div className="p-6 w-full max-w-sm">
        {/* Feedback messages */}
        {serverError && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            {serverError}
          </div>
        )}

        <motion.h1
          className="text-white text-5xl font-bold text-center mb-4"
          {...fadeInLeft(0.1)}
        >
          Sign Up
        </motion.h1>

        <motion.h2
          className="text-white text-sm text-center mb-8 inter"
          {...fadeInLeft(0.2)}
        >
          Please Enter Your Details
        </motion.h2>
        <motion.div className="mb-6" {...fadeInLeft(0.25)}>
          <RadioGroup
            row
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="flex justify-center"
          >
            <FormControlLabel
              value="user"
              control={<Radio sx={{ color: "white" }} />}
              label={<span className="text-white">User</span>}
            />
            <FormControlLabel
              value="recruiter"
              control={<Radio sx={{ color: "white" }} />}
              label={<span className="text-white">Recruiter</span>}
            />
          </RadioGroup>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <motion.div className="mb-8" {...fadeInLeft(0.3)}>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "20px" },
              }}
              sx={{
                "& label": { color: "#808080" },
                "& label.Mui-focused": { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
              error={!!errors.username}
              helperText={errors.username}
            />
          </motion.div>

          <motion.div className="mb-8" {...fadeInLeft(0.4)}>
            <TextField
              label="Email ID"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "20px" },
              }}
              sx={{
                "& label": { color: "#808080" },
                "& label.Mui-focused": { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
          </motion.div>

          <motion.div className="mb-4" {...fadeInLeft(0.5)}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "20px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& label": { color: "#808080" },
                "& label.Mui-focused": { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </motion.div>

          <motion.div
            className="mb-4 flex justify-between items-center"
            {...fadeInLeft(0.6)}
          >
            <div></div>
            <Link to="/login" className="text-white text-sm hover:underline">
              Already a User? Login
            </Link>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-80 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...fadeInLeft(0.7)}
          >
            Sign Up
          </motion.button>
        </form>

        <motion.div className="flex items-center my-6" {...fadeInLeft(0.8)}>
          <div className="flex-1 border-t border-dashed border-white"></div>
          <span className="px-2 text-white text-sm">OR</span>
          <div className="flex-1 border-t border-dashed border-white"></div>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-16 text-white text-md"
          {...fadeInLeft(0.9)}
        >
          <button
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/google")
            }
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span>Google</span>
          </button>
          <button
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/github")
            }
          >
            <img src="/github.png" alt="Github" className="w-5 h-5" />
            <span>Github</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupLeftDiv;
