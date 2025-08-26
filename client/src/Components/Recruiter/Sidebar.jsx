import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaDatabase,
  FaThLarge,
  FaCog,
  FaBars,
  FaTimes,
  FaFlag,
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
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 outfit
      ${
        active
          ? "bg-amber-500 text-white font-semibold"
          : "text-white hover:bg-amber-400/20 hover:text-amber-200"
      }`}
  >
    <div className="text-lg">{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
);

function Sidebar({ showMobileToggle = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Allow external trigger (from Topbar) to open mobile sidebar
  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener("open-mobile-sidebar", onOpen);
    return () => window.removeEventListener("open-mobile-sidebar", onOpen);
  }, []);

  // Broadcast open/close and toggle a body class for global styling hooks
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new Event("mobile-sidebar-open"));
      document.body.classList.add("recruiter-mobile-sidebar-open");
    } else {
      window.dispatchEvent(new Event("mobile-sidebar-close"));
      document.body.classList.remove("recruiter-mobile-sidebar-open");
    }
    return () => {
      document.body.classList.remove("recruiter-mobile-sidebar-open");
    };
  }, [isOpen]);

  const items = [
    { icon: <FaThLarge />, label: "Recruiter Dashboard", path: "/recruiter/dashboard" },
    { icon: <FaUsers />, label: "Candidate Directory", path: "/recruiter/dashboard/candidates" },
    { icon: <FaDatabase />, label: "Bookmarked Candidates", path: "/recruiter/dashboard/bookmarks" },
    { icon: <FaFlag />, label: "Reported/Contacted Candidates", path: "/recruiter/dashboard/reported-contacted" },
    { icon: <FaCog />, label: "Settings", path: "/recruiter/dashboard/settings" },
  ];

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      {showMobileToggle && (
        <button
          id="mobileSidebarOpenBtn"
          onClick={() => setIsOpen(true)}
          className="md:hidden text-amber-300 text-2xl m-4 fixed top-4 left-4 z-50"
        >
          <FaBars />
        </button>
      )}

      {/* Mobile overlay and sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-[60px] z-40"
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
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white/10 border border-white/20 text-white p-6 flex flex-col gap-6 shadow-lg rounded-tr-3xl rounded-br-3xl md:hidden"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Brand header removed on mobile per request; keep spacer to preserve layout */}
              <div aria-hidden="true" className="h-10 mb-8" />

              {items.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SidebarItem
                    icon={null}
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

      {/* Desktop sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex w-64 bg-white/10 border border-white/20 text-white p-6 flex-col gap-6 shadow-lg rounded-tr-3xl rounded-br-3xl"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-amber-500/30 p-2 rounded-full shadow-lg">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold outfit tracking-wide text-white">
            PROFOLIO
          </h2>
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
