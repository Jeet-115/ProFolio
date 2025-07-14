import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

function Topbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 🔥 Call server to destroy the session cookie
      await axiosInstance.get("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <motion.div
      className="flex justify-between items-center mb-6 px-4 py-2 border border-white/10 bg-white/10 backdrop-blur rounded-xl shadow-sm text-white"
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
        className="outfit font-semibold text-lg pl-[50px] md:pl-0"
      >
        Welcome, {user?.username || user?.name || "User"}
      </motion.span>

      <motion.button
        variants={itemVariants}
        onClick={handleLogout}
        className="bg-[#1BA089] hover:bg-[#159f82] px-4 py-2 rounded-lg text-white outfit transition-all"
      >
        Logout
      </motion.button>
    </motion.div>
  );
}

export default Topbar;
