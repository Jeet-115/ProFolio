import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function DashboardHome() {
  const { user } = useSelector((state) => state.auth);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeUp}
        className="p-6 sm:p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg text-white text-center"
      >
        <motion.h1
          className="text-3xl font-semibold mb-2"
          variants={fadeUp}
          custom={1}
        >
          Welcome, {user?.username || user?.name || "User"}!
        </motion.h1>
        <motion.p
          className="text-lg text-[#E0F7FA]/90"
          variants={fadeUp}
          custom={2}
        >
          Let’s transform your data into meaningful insights ✨
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

export default DashboardHome;
