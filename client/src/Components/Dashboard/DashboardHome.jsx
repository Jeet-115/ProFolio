// import { useSelector } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaFileExcel,
  FaChartBar,
  FaHistory,
  FaDownload,
  FaCog,
  FaThLarge,
} from "react-icons/fa";
import LoadingOverlay from "./LoadingOverlay";

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 },
  },
};

function DashboardHome() {
  // const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigationItems = [
    {
      icon: <FaFileExcel className="text-3xl" />,
      title: "Resume Builder",
      description: "Create professional resumes",
      path: "/dashboard/resume-builder",
      color: "from-blue-500 to-blue-600",
      loadingMessage: "Loading Resume Builder...",
    },
    {
      icon: <FaDownload className="text-3xl" />,
      title: "Portfolio Builder",
      description: "Build stunning portfolios",
      path: "/dashboard/portfolio-builder",
      color: "from-green-500 to-green-600",
      loadingMessage: "Loading Portfolio Builder...",
    },
    {
      icon: <FaFileExcel className="text-3xl" />,
      title: "Resume Templates",
      description: "Choose from templates",
      path: "/dashboard/templates/resumes",
      color: "from-purple-500 to-purple-600",
      loadingMessage: "Loading Resume Templates...",
    },
    {
      icon: <FaDownload className="text-3xl" />,
      title: "Portfolio Templates",
      description: "Explore portfolio designs",
      path: "/dashboard/templates/portfolios",
      color: "from-pink-500 to-pink-600",
      loadingMessage: "Loading Portfolio Templates...",
    },
    {
      icon: <FaHistory className="text-3xl" />,
      title: "My Resumes",
      description: "View saved resumes",
      path: "/dashboard/resume-history",
      color: "from-orange-500 to-orange-600",
      loadingMessage: "Loading Your Resumes...",
    },
    {
      icon: <FaHistory className="text-3xl" />,
      title: "My Portfolios",
      description: "Manage portfolios",
      path: "/dashboard/portfolio-history",
      color: "from-teal-500 to-teal-600",
      loadingMessage: "Loading Your Portfolios...",
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: "Analytics",
      description: "Track performance",
      path: "/dashboard/analytics",
      color: "from-indigo-500 to-indigo-600",
      loadingMessage: "Loading Analytics...",
    },
    {
      icon: <FaCog className="text-3xl" />,
      title: "Profile & Settings",
      description: "Manage your account",
      path: "/dashboard/profile",
      color: "from-gray-500 to-gray-600",
      loadingMessage: "Loading Profile Settings...",
    },
  ];

  const handleNavigate = async (path, message) => {
    setIsLoading(true);
    setLoadingMessage(message);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    navigate(path);
    
    // Hide loading after navigation with 1 second buffer
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div
          variants={fadeUp}
          className="p-6 sm:p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg text-white text-center"
        >
          <motion.h1
            className="text-3xl font-semibold mb-2"
            variants={fadeUp}
            custom={1}
          >
            {/* Welcome, {user?.username || user?.name || "User"}! */}
            Welcome to ProFolio!
          </motion.h1>
          <motion.p
            className="text-lg text-[#E0F7FA]/90"
            variants={fadeUp}
            custom={2}
          >
            Let's transform your data into meaningful insights ✨
          </motion.p>
        </motion.div>

        {/* Navigation Cards - Hidden on mobile, shown on tablet and up */}
        <motion.div
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={fadeUp}
          custom={3}
        >
          {navigationItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              onClick={() => handleNavigate(item.path, item.loadingMessage)}
              className="cursor-pointer"
            >
              {/* Tablet Cards */}
              <div className="lg:hidden bg-gradient-to-br from-[#1BA089] to-[#159f82] p-6 rounded-2xl shadow-lg text-white">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>

              {/* Laptop Flip Cards */}
              <div className="hidden lg:block flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="flex items-center justify-center h-full text-center">
                      <div className="p-3 bg-white/20 rounded-full">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                      <div className="p-3 bg-white/20 rounded-full">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm opacity-90 px-4">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <style jsx>{`
          .flip-card {
            background-color: transparent;
            width: 240px;
            height: 154px;
            perspective: 1000px;
            color: white;
            margin: 0 auto;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
          }

          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          .flip-card-front, .flip-card-back {
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 1rem;
          }

          .flip-card-front {
            background: linear-gradient(135deg, #1BA089 0%, #159f82 100%);
          }

          .flip-card-back {
            background: linear-gradient(135deg, #1F2D3C 0%, #1BA089 100%);
            transform: rotateY(180deg);
          }
        `}</style>

        {/* Mobile Note */}
        <motion.div
          className="md:hidden p-4 bg-white/5 rounded-xl border border-white/10 text-white/70 text-center text-sm"
          variants={fadeUp}
          custom={4}
        >
          Use the menu button (☰) in the top-left to access all features on mobile
        </motion.div>

        {/* Loading Overlay */}
        <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
      </motion.div>
    </AnimatePresence>
  );
}

export default DashboardHome;
