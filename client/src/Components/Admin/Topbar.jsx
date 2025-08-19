import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

function Topbar() {
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
      className="flex justify-end items-center gap-4 mb-6"
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
      <motion.span
        variants={itemVariants}
        className="text-[#2E3C43] outfit font-semibold"
      >
        {/* {user?.username || user?.name || "User"} */}
      </motion.span>

      <motion.button
        variants={itemVariants}
        onClick={handleLogout}
        className="bg-white text-[#00ACC1] px-4 py-2 rounded shadow-sm hover:bg-[#4DD0E1] hover:text-white transition-all cursor-pointer outfit font-semibold"
      >
        Logout
      </motion.button>
    </motion.div>
  );
}

export default Topbar;
