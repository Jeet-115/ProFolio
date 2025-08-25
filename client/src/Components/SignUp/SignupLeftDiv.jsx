import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useSignUp from "./SignUp";
// Removed Material UI in favor of Tailwind inputs and inline SVG icons
import RoleRadio from "../Common/RoleRadio";

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
        <motion.div className="mb-6 flex justify-center" {...fadeInLeft(0.25)}>
          <RoleRadio name="role" value={formData.role} onChange={handleChange} />
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <motion.div className="mb-8" {...fadeInLeft(0.3)}>
            <div>
              <input
                className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
                placeholder="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
          </motion.div>

          <motion.div className="mb-8" {...fadeInLeft(0.4)}>
            <div>
              <input
                className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
                placeholder="Email ID"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </motion.div>

          <motion.div className="mb-4" {...fadeInLeft(0.5)}>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 pr-12"
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.01c2.12 4.06 6.36 6.99 10.066 6.99 1.676 0 3.303-.37 4.757-1.04M21.07 15.977A10.45 10.45 0 0022.066 12c-2.12-4.06-6.36-6.99-10.066-6.99-1.13 0-2.23.15-3.28.43M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.808 2.808a1 1 0 011.414 0l16.97 16.97a1 1 0 01-1.414 1.414l-2.122-2.122A10.477 10.477 0 0112 19c-3.706 0-7.946-2.93-10.066-6.99a10.45 10.45 0 012.122-3.757M9.88 9.88A3 3 0 0115 12m-3 3a3 3 0 01-3-3c0-.795.312-1.52.818-2.06" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
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
