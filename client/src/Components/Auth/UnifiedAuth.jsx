import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "../Login/Login";
import useSignUp from "../SignUp/SignUp";
// Removed Material UI in favor of Tailwind + inline SVG icons
import RoleRadio from "../Common/RoleRadio";

const UnifiedAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Login hook
  const loginHook = useLogin();
  
  // Signup hook
  const signupHook = useSignUp();

  // Get current hook based on mode
  const currentHook = isLogin ? loginHook : signupHook;

  // Animation settings
  const animationSettings = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay) => ({ duration: 0.5, delay }),
  };

  // Check if device is mobile/tablet
  const isMobileOrTablet = () => {
    return window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // OAuth handler - uses redirect for mobile/tablet, popup for desktop
  const handleOAuth = (provider) => {
    const OAUTH_URLS = {
      google: "http://localhost:3000/auth/google",
      github: "http://localhost:3000/auth/github",
    };

    // Always use redirect for mobile/tablet devices
    if (isMobileOrTablet()) {
      window.location.href = OAUTH_URLS[provider];
      return;
    }

    // Use popup for desktop (login mode only)
    if (isLogin) {
      const width = 500, height = 600;
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
          window.removeEventListener("message", handleMessage);
          popup.close();
        } else if (event.data?.error) {
          window.removeEventListener("message", handleMessage);
          popup.close();
        }
      };

      window.addEventListener("message", handleMessage);
    } else {
      // Use redirect for signup mode on desktop too
      window.location.href = OAUTH_URLS[provider];
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Toggle Buttons */}
        <motion.div
          className="flex bg-white/10 rounded-full p-1 mb-8"
          {...animationSettings}
          transition={animationSettings.transition(0.1)}
        >
          <button
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              isLogin
                ? "bg-white text-black"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              !isLogin
                ? "bg-white text-black"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-white text-4xl font-bold text-center mb-4"
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </motion.h1>

        <motion.h2
          className="text-white text-sm text-center mb-8 inter"
          {...animationSettings}
          transition={animationSettings.transition(0.2)}
        >
          Please Enter Your Details
        </motion.h2>

        {/* Error Messages */}
        {(signupHook.serverError && !isLogin) && (
          <div className="mb-4 text-red-500 text-center font-semibold text-sm">
            {signupHook.serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={currentHook.handleSubmit} noValidate>
          {/* Role selection for signup */}
          {!isLogin && (
            <motion.div className="mb-6 flex justify-center" {...animationSettings} transition={animationSettings.transition(0.28)}>
              <RoleRadio
                name="role"
                value={signupHook.formData.role}
                onChange={signupHook.handleChange}
              />
            </motion.div>
          )}

          {/* Username field for signup */}
          {!isLogin && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <input
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={signupHook.formData.username}
                  onChange={signupHook.handleChange}
                />
                {signupHook.errors.username && (
                  <p className="text-red-500 text-xs mt-1">{signupHook.errors.username}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Email/Username Field */}
          <motion.div
            className="mb-6"
            {...animationSettings}
            transition={animationSettings.transition(0.3)}
          >
            {isLogin ? (
              <input
                className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
                placeholder="Email ID or Username"
                name="username"
                type="text"
                value={loginHook.formData.username}
                onChange={loginHook.handleChange}
              />
            ) : (
              <div>
                <input
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
                  placeholder="Email ID"
                  name="email"
                  type="email"
                  value={signupHook.formData.email}
                  onChange={signupHook.handleChange}
                />
                {signupHook.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{signupHook.errors.email}</p>
                )}
              </div>
            )}
            {loginHook.errors.username && isLogin && (
              <p className="text-red-500 text-xs mt-1">{loginHook.errors.username}</p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="mb-4"
            {...animationSettings}
            transition={animationSettings.transition(0.4)}
          >
            {isLogin ? (
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 pr-12"
                  placeholder="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginHook.formData.password}
                  onChange={loginHook.handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
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
              </div>
            ) : (
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 pr-12"
                  placeholder="Password"
                  name="password"
                  type={signupHook.showPassword ? "text" : "password"}
                  value={signupHook.formData.password}
                  onChange={signupHook.handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  onClick={() => signupHook.setShowPassword(!signupHook.showPassword)}
                  tabIndex={-1}
                >
                  {signupHook.showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.01c2.12 4.06 6.36 6.99 10.066 6.99 1.676 0 3.303-.37 4.757-1.04M21.07 15.977A10.45 10.45 0 0022.066 12c-2.12-4.06-6.36-6.99-10.066-6.99-1.13 0-2.23.15-3.28.43M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.808 2.808a1 1 0 011.414 0l16.97 16.97a1 1 0 01-1.414 1.414l-2.122-2.122A10.477 10.477 0 0112 19c-3.706 0-7.946-2.93-10.066-6.99a10.45 10.45 0 012.122-3.757M9.88 9.88A3 3 0 0115 12m-3 3a3 3 0 01-3-3c0-.795.312-1.52.818-2.06" />
                    </svg>
                  )}
                </button>
                {signupHook.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{signupHook.errors.password}</p>
                )}
              </div>
            )}
            {loginHook.errors.password && isLogin && (
              <p className="text-red-500 text-xs mt-1">{loginHook.errors.password}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-80 transition-all mb-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...animationSettings}
            transition={animationSettings.transition(0.5)}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        {/* OR Divider */}
        <motion.div
          className="flex items-center my-6"
          {...animationSettings}
          transition={animationSettings.transition(0.6)}
        >
          <div className="flex-1 border-t border-dashed border-white"></div>
          <span className="px-2 text-white text-sm">OR</span>
          <div className="flex-1 border-t border-dashed border-white"></div>
        </motion.div>

        {/* Social Login Options */}
        <motion.div
          className="flex justify-center space-x-8 text-white text-sm"
          {...animationSettings}
          transition={animationSettings.transition(0.7)}
        >
          <button
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
            onClick={() => handleOAuth("google")}
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span>Google</span>
          </button>
          <button
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
            onClick={() => handleOAuth("github")}
          >
            <img src="/github.png" alt="Github" className="w-5 h-5" />
            <span>Github</span>
          </button>
        </motion.div>

        {/* Additional Navigation - Only show for signup mode */}
        {!isLogin && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-center mb-3">
              <div className="flex-1 border-t border-dashed border-white/30"></div>
              <span className="px-3 text-white/60 text-xs">Looking to hire?</span>
              <div className="flex-1 border-t border-dashed border-white/30"></div>
            </div>
            <Link
              to="/recruiter/signup"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white text-sm font-medium transition-colors group"
            >
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <span>Join as Recruiter</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default UnifiedAuth;
