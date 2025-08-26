import { motion } from "framer-motion";
import Logo from "../Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isDashboardHome =
    location.pathname === "/recruiter/dashboard" || location.pathname === "/recruiter/dashboard/";

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {});
      // Optionally clear user state here if you add it later
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      // Optionally show a toast or error message
    }
  };

  const handleBackToDashboard = () => {
    navigate("/recruiter/dashboard");
  };

  // Listen to global events broadcast by Sidebar to toggle blur on logo
  useEffect(() => {
    const onOpen = () => setMobileSidebarOpen(true);
    const onClose = () => setMobileSidebarOpen(false);
    window.addEventListener("mobile-sidebar-open", onOpen);
    window.addEventListener("mobile-sidebar-close", onClose);
    return () => {
      window.removeEventListener("mobile-sidebar-open", onOpen);
      window.removeEventListener("mobile-sidebar-close", onClose);
    };
  }, []);

  return (
    <motion.div
      className="sticky top-0 z-40 flex justify-between items-center mb-6 px-4 py-2 border border-white/10 bg-white/20 backdrop-blur rounded-xl shadow-sm text-white"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { when: "beforeChildren", staggerChildren: 0.2 },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open Menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/15 border border-white/20 hover:bg-white/25 active:scale-95 transition"
          onClick={() => window.dispatchEvent(new Event("open-mobile-sidebar"))}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>
        {/* Brand */}
        <div className={`flex items-center gap-2 transition-all ${mobileSidebarOpen ? "blur-sm" : "blur-0"}`}>
          <Logo compact />
        </div>
        {/* Back Button - Only show when not on dashboard home and not on mobile */}
        {!isDashboardHome && (
          <motion.button
            variants={itemVariants}
            onClick={handleBackToDashboard}
            className="hidden md:block bg-white/20 text-center w-48 rounded-2xl h-14 relative text-white text-xl font-semibold group outfit"
            type="button"
          >
            <div className="bg-[#F59E0B] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#ffffff" />
                <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#ffffff" />
              </svg>
            </div>
            <p className="translate-x-2 flex items-center justify-center h-full">Go Back</p>
          </motion.button>
        )}

        <motion.span variants={itemVariants} className="outfit font-semibold text-lg">
          {/* Recruiter */}
        </motion.span>
      </div>

      <motion.button
        variants={itemVariants}
        onClick={handleLogout}
        className="group flex items-center justify-start w-[45px] md:w-[125px] h-[45px] border-none rounded-full md:rounded-[40px] cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg bg-[#F59E0B] hover:bg-[#D97706] hover:w-[125px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]"
      >
        {/* Icon */}
        <div className="w-full md:w-[30%] transition-all duration-300 flex items-center justify-center md:pl-5 group-hover:w-[30%] group-hover:pl-5">
          <svg viewBox="0 0 512 512" className="w-[17px] fill-white">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </div>
        {/* Text */}
        <div className="absolute right-0 w-0 md:w-[70%] opacity-0 md:opacity-100 text-white text-lg font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:w-[70%] group-hover:pr-2.5 md:pr-2.5 outfit">
          Logout
        </div>
      </motion.button>
    </motion.div>
  );
}

export default Topbar;
