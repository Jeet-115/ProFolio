import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "./Login";
import OAuthLoginButton from "./OAuthLoginButton";
import { useNavigate } from "react-router-dom";

const LoginLeftDiv = () => {
  const { formData, errors, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Animation settings
  const animationSettings = {
    initial: { opacity: 0, x: -50, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: (delay) => ({ duration: 0.5, delay }),
  };

  // OAuth popup handler
  const handleOAuthPopup = (provider) => {
    const OAUTH_URLS = {
      google: "http://localhost:3000/auth/google",
      github: "http://localhost:3000/auth/github",
    };
    const width = 500,
      height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      OAUTH_URLS[provider],
      `${provider}-login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return;
      if (event.data?.user) {
        navigate(event.data.redirect);
        window.removeEventListener("message", handleMessage);
        popup.close();
      } else if (event.data?.error) {
        window.removeEventListener("message", handleMessage);
        popup.close();
      }
    };

    window.addEventListener("message", handleMessage);
  };

  // Handle OAuth login success
  const handleOAuthSuccess = (data) => {
    // Save user info to state/context if needed
    navigate(data.redirect);
  };

  const handleOAuthError = (error) => {
    // Show error to user
    console.error("OAuth Error:", error);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        className="p-6 w-full max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <motion.h1
          className="text-white text-5xl font-bold text-center mb-4"
          {...animationSettings}
          transition={animationSettings.transition(0.1)}
        >
          Login
        </motion.h1>

        <motion.h2
          className="text-white text-sm text-center mb-8 inter"
          {...animationSettings}
          transition={animationSettings.transition(0.2)}
        >
          Please Enter Your Details
        </motion.h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email ID */}
          <motion.div
            className="mb-8"
            {...animationSettings}
            transition={animationSettings.transition(0.3)}
          >
            <input
              className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
              placeholder="Email ID or Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="mb-4"
            {...animationSettings}
            transition={animationSettings.transition(0.4)}
          >
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12.01c2.12 4.06 6.36 6.99 10.066 6.99 1.676 0 3.303-.37 4.757-1.04M21.07 15.977A10.45 10.45 0 0022.066 12c-2.12-4.06-6.36-6.99-10.066-6.99-1.13 0-2.23.15-3.28.43M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.808 2.808a1 1 0 011.414 0l16.97 16.97a1 1 0 01-1.414 1.414l-2.122-2.122A10.477 10.477 0 0112 19c-3.706 0-7.946-2.93-10.066-6.99a10.45 10.45 0 012.122-3.757M9.88 9.88A3 3 0 0115 12m-3 3a3 3 0 01-3-3c0-.795.312-1.52.818-2.06"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </motion.div>

          {/* Submit Button with New User Links */}
          <motion.div
            className="mb-4 space-y-2"
            {...animationSettings}
            transition={animationSettings.transition(0.5)}
          >
            <div className="flex justify-center space-x-4 text-white text-sm">
              <Link to="/signup" className="hover:underline transition-all hover:text-white/80">
                Sign up as User
              </Link>
              <span className="text-white/50">•</span>
              <Link to="/recruiter/signup" className="hover:underline transition-all hover:text-white/80 flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                <span>Join as Recruiter</span>
              </Link>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-80 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...animationSettings}
            transition={animationSettings.transition(0.6)}
          >
            Submit
          </motion.button>
        </form>

        {/* OR Divider */}
        <motion.div
          className="flex items-center my-6"
          {...animationSettings}
          transition={animationSettings.transition(0.7)}
        >
          <div className="flex-1 border-t border-dashed border-white"></div>
          <span className="px-2 text-white text-sm">OR</span>
          <div className="flex-1 border-t border-dashed border-white"></div>
        </motion.div>

        {/* Social Login Options */}
        <motion.div
          className="flex justify-center space-x-16 text-white text-md"
          {...animationSettings}
          transition={animationSettings.transition(0.8)}
        >
          <button
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
            onClick={() => handleOAuthPopup("google")}
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span>Google</span>
          </button>
          <button
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
            onClick={() => handleOAuthPopup("github")}
          >
            <img src="/github.png" alt="Github" className="w-5 h-5" />
            <span>Github</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginLeftDiv;
