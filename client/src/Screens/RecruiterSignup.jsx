import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../Components/Logo";
import useRecruiterSignUp from "../Components/SignUp/RecruiterSignUp";

const RecruiterSignup = () => {
  const {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    serverError,
    success,
  } = useRecruiterSignUp();

  // Check if device is mobile/tablet
  const isMobileOrTablet = () => {
    return window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // OAuth handler for recruiters - includes role parameter
  const handleOAuth = (provider) => {
    const OAUTH_URLS = {
      google: `http://localhost:3000/auth/google?role=recruiter`,
      github: `http://localhost:3000/auth/github?role=recruiter`,
    };

    // Always use redirect for mobile/tablet devices
    if (isMobileOrTablet()) {
      window.location.href = OAUTH_URLS[provider];
      return;
    }

    // Use popup for desktop
    const width = 500, height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      OAUTH_URLS[provider],
      `${provider}-recruiter-signup`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return;
      if (event.data?.user) {
        console.log('OAuth success data:', event.data); // Debug log
        window.removeEventListener("message", handleMessage);
        popup.close();
        // Ensure we redirect to recruiter dashboard
        const redirectUrl = event.data.user.role === 'recruiter' 
          ? '/recruiter/dashboard' 
          : event.data.redirect || '/recruiter/dashboard';
        console.log('Redirecting to:', redirectUrl); // Debug log
        window.location.href = redirectUrl;
      } else if (event.data?.error) {
        console.error('OAuth error:', event.data.error);
        window.removeEventListener("message", handleMessage);
        popup.close();
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <div className="bg-[linear-gradient(180deg,_#111026_0%,_#1E1B4B_55%,_#312E81_100%)] min-h-screen">
      <Logo />
      
      <div className="flex items-center justify-center w-full mt-14 px-4">
        <motion.div
          className="w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-amber-500 p-3 rounded-2xl mr-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">Join as Recruiter</h1>
            </div>
            <p className="text-white/80 text-sm">
              Find and connect with talented candidates
            </p>
          </motion.div>

          {/* Success Message */}
          {success && (
            <motion.div
              className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-100 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {success}
            </motion.div>
          )}

          {/* Error Message */}
          {serverError && (
            <motion.div
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {serverError}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="block text-white/90 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-300 text-xs mt-1">{errors.username}</p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-white/90 text-sm font-medium mb-2">
                Work Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your work email"
              />
              {errors.email && (
                <p className="text-red-300 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.758 7.758M12 12l2.122-2.122m-2.122 2.122L7.758 16.242" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">{errors.password}</p>
              )}
            </motion.div>

            {/* Features List */}
            <motion.div
              className="bg-white/10 rounded-xl p-4 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="text-white font-medium text-sm mb-3">As a recruiter, you can:</h4>
              <div className="space-y-2">
                <div className="flex items-center text-white/80 text-xs">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Browse candidate directory
                </div>
                <div className="flex items-center text-white/80 text-xs">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  View portfolios and resumes
                </div>
                <div className="flex items-center text-white/80 text-xs">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Track and bookmark candidates
                </div>
                <div className="flex items-center text-white/80 text-xs">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access recruitment analytics
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Recruiter Account
            </motion.button>
          </form>

          {/* OR Divider */}
          <motion.div
            className="flex items-center my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-white/80 text-sm font-medium">OR</span>
            <div className="flex-1 border-t border-white/30"></div>
          </motion.div>

          {/* Social Login Options */}
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white py-3 px-6 rounded-xl font-medium transition-all group w-full max-w-[140px]"
              onClick={() => handleOAuth("google")}
            >
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </button>
            <button
              className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white py-3 px-6 rounded-xl font-medium transition-all group w-full max-w-[140px]"
              onClick={() => handleOAuth("github")}
            >
              <img src="/github.png" alt="GitHub" className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </button>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="mt-8 text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-white/60 text-sm">or</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>
            
            <div className="space-y-2">
              <p className="text-white/70 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-amber-300 hover:text-amber-200 font-medium underline">
                  Sign In
                </Link>
              </p>
              <p className="text-white/70 text-sm">
                Looking to build a portfolio?{" "}
                <Link to="/signup" className="text-amber-300 hover:text-amber-200 font-medium underline">
                  Join as User
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterSignup;
