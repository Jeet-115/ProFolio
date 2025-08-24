import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../Components/Dashboard/Sidebar";
import Topbar from "../Components/Dashboard/Topbar";

function DashboardLayout() {
  return (
    <motion.div
      className="min-h-screen w-full bg-[linear-gradient(to_bottom,_#1F2D3C_0%,_#1BA089_26%,_#1ABC9C_100%)] flex transition-all duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Sidebar - Only show on mobile */}
      <div className="md:hidden">
        <Sidebar />
      </div>
      
      <div className="flex-1 md:p-6">
        <Topbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md text-white outfit"
        >
          <Outlet />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DashboardLayout;
