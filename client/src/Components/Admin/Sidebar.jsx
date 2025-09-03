import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCog,
  FaDatabase,
  FaThLarge,
  FaCog,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: { x: -300, opacity: 0, transition: { duration: 0.25 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35 } },
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 outfit sidebar-item-hover
      ${
        active
          ? "bg-gradient-to-r from-[#FFF8E1] to-transparent text-[#E65100] font-semibold shadow luxury-btn"
          : "text-[#E65100] hover:bg-[#FFFDE7] border border-transparent hover:border-[#F9A825]/30 luxury-btn"
      }`}
  >
    <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r ${active ? "bg-[#F9A825]" : "bg-transparent group-hover:bg-[#F9A825]/60"}`} />
    <div className="text-base">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { icon: <FaThLarge />, label: "Admin Dashboard", path: "/admin" },
    { icon: <FaUserCog />, label: "Manage Users", path: "/admin/users" },
    { icon: <FaDatabase />, label: "Manage Recruiters", path: "/admin/recruiters" },
    { icon: <FaThLarge />, label: "Analytics", path: "/admin/analytics" },
    { icon: <FaCog />, label: "Settings", path: "/admin/settings" },
  ];

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile sidebar (slides over content without blocking the whole page) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#FFFDE7] to-[#FFFEF7] text-[#E65100] p-4 pt-6 flex flex-col gap-4 shadow-2xl rounded-tr-3xl rounded-br-3xl md:hidden border-r border-[#F9A825]/20 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#F9A825] text-xl hover:text-[#F57F17] transition-colors luxury-btn luxury-focus"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-[#F9A825] to-[#F57F17] p-2.5 rounded-full shadow-lg border-2 border-[#FFD54F]/30 glow-border">
                <img src="/logo.png" alt="logo" className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold tracking-wide outfit luxury-gold-text luxury-heading">PROFOLIO</h2>
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
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex w-64 bg-gradient-to-b from-[#FFFDE7] to-[#FFFEF7] text-[#E65100] p-6 flex-col gap-4 shadow-2xl rounded-tr-3xl rounded-br-3xl border-r border-[#F9A825]/20"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-[#F9A825] to-[#F57F17] p-3 rounded-full shadow-lg border-2 border-[#FFD54F]/30 glow-border">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold outfit tracking-wide luxury-gold-text luxury-heading">PROFOLIO</h2>
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
