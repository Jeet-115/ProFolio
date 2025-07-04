import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 pt-3">
        <Link to="/">
          <div className="flex">
            <h1 className="text-5xl font-bold text-[#1ABC9C] inter ml-3 mt-3">
              PROFOLIO
            </h1>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Logo;
