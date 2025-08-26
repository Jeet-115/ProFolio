import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = ({ compact = false }) => {
  const location = useLocation();
  const isRecruiterRoute = location.pathname.startsWith("/recruiter");
  const logoColor = isRecruiterRoute ? "#F59E0B" : "#1ABC9C"; // amber for recruiter, teal otherwise
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={compact ? "flex items-center" : "flex items-center justify-between px-6 pt-3"}>
        <Link to="/">
          <div className="flex">
            <h1 className={compact ? "text-lg md:text-xl font-bold inter" : "text-5xl font-bold inter ml-3 mt-3"} style={{ color: logoColor }}>
              PROFOLIO
            </h1>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Logo;
