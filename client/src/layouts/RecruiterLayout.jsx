import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../Components/Recruiter/Sidebar";
import Topbar from "../Components/Recruiter/Topbar";

function RecruiterLayout() {
  return (
    <motion.div
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-[linear-gradient(180deg,_#111026_0%,_#1E1B4B_55%,_#312E81_100%)] flex transition-all duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Sidebar visible only on mobile (Topbar controls open) */}
      <div className="md:hidden">
        <Sidebar showMobileToggle={false} />
      </div>

      <div className="flex-1 w-full overflow-x-hidden p-4 sm:p-8">
        <Topbar />

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-2xl shadow-md text-white outfit min-h-[300px]">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
}

export default RecruiterLayout;
