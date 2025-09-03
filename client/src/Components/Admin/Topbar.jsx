import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { FaBars } from "react-icons/fa";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

function Topbar({ onOpenSidebar }) {
  const navigate = useNavigate();

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

  return (
    <motion.div
      className="flex justify-between items-center gap-4 mb-6"
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
      {/* Mobile menu button */}
      <motion.button
        onClick={onOpenSidebar}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[#F9A825]/30 shadow luxury-btn luxury-focus text-[#F9A825]"
        variants={itemVariants}
        aria-label="Open menu"
      >
        <FaBars />
      </motion.button>

      <div className="flex-1" />

      <motion.span
        variants={itemVariants}
        className="text-[#E65100] outfit font-semibold text-lg luxury-subheading hidden sm:inline"
      >
        Admin Panel
      </motion.span>

      <motion.button
        variants={itemVariants}
        onClick={handleLogout}
        className="bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:from-[#F57F17] hover:to-[#E65100] transition-all cursor-pointer outfit font-semibold border border-[#FFD54F]/30 hover:shadow-xl hover:scale-105 luxury-btn luxury-focus"
      >
        Logout
      </motion.button>
    </motion.div>
  );
}

export default Topbar;
