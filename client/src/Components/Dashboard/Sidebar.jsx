import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileExcel,
  FaChartBar,
  FaHistory,
  FaDownload,
  FaCog,
  FaThLarge,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: { x: -300, opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 outfit
      ${
        active
          ? "bg-white/20 text-white shadow-inner"
          : "text-white hover:bg-white/10 hover:shadow-sm"
      }`}
  >
    <div className="text-lg">{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { icon: <FaThLarge />, label: "Dashboard", path: "/dashboard" },
    {
      icon: <FaFileExcel />,
      label: "Resume Builder",
      path: "/dashboard/resume-builder",
    },
    {
      icon: <FaDownload />,
      label: "Portfolio Builder",
      path: "/dashboard/portfolio-builder",
    },

    // Templates Section
    {
      icon: <FaFileExcel />,
      label: "Resume Templates",
      path: "/dashboard/templates/resumes",
    },
    {
      icon: <FaDownload />,
      label: "Portfolio Templates",
      path: "/dashboard/templates/portfolios",
    },

    // My Documents Section
    { icon: <FaHistory />, label: "My Resumes", path: "/dashboard/resume-history" },
    {
      icon: <FaHistory />,
      label: "My Portfolios",
      path: "/dashboard/portfolio-history",
    },

    // Analytics
    { icon: <FaChartBar />, label: "Analytics", path: "/dashboard/analytics" },

    // Profile & Settings
    {
      icon: <FaCog />,
      label: "Profile / Settings",
      path: "/dashboard/profile",
    },
  ];

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-[#E0F7FA] text-2xl m-4 fixed top-6 left-5 z-50"
      >
        <FaBars />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-lg bg-black/30 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 text-white p-6 flex flex-col gap-6 shadow-xl rounded-tr-3xl rounded-br-3xl md:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-wide outfit">
                  PROFOLIO
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {items.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    active={location.pathname === item.path}
                    onClick={() => handleNavigate(item.path)}
                  />
                </motion.div>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 text-white p-6 flex-col gap-6 shadow-xl rounded-tr-3xl rounded-br-3xl"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-white/20 p-2 rounded-full shadow-lg">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold tracking-wide outfit">PROFOLIO</h2>
        </motion.div>

        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SidebarItem
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            />
          </motion.div>
        ))}
      </motion.aside>
    </>
  );
}

export default Sidebar;
