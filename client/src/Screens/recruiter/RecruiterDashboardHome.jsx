import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaDatabase, FaCog, FaFlag } from "react-icons/fa";
import LoadingOverlay from "../../Components/Dashboard/LoadingOverlay";
import {
  getRecruiterProfile,
  getRecruiterStats,
  getRecentCandidates,
  getSuggestedCandidates,
} from "../../services/recruiterHomeService";

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

export default function RecruiterDashboardHome() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  // Overview data
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [suggestedCandidates, setSuggestedCandidates] = useState([]);
  const [loadingOverview, setLoadingOverview] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboardData = async () => {
      try {
        const [profileRes, statsRes, recentRes, suggestedRes] =
          await Promise.all([
            getRecruiterProfile(),
            getRecruiterStats(),
            getRecentCandidates(),
            getSuggestedCandidates(),
          ]);
        if (!isMounted) return;
        setProfile(profileRes.data);
        setStats(statsRes.data);
        setRecentCandidates(recentRes.data || []);
        setSuggestedCandidates(suggestedRes.data || []);
      } catch (err) {
        console.error("Error fetching recruiter overview:", err);
      } finally {
        if (isMounted) setLoadingOverview(false);
      }
    };
    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const navigationItems = [
    {
      icon: (
        <motion.span
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
          className="inline-flex"
        >
          <FaUsers className="text-3xl" />
        </motion.span>
      ),
      title: "Candidate Directory",
      description: "Browse and filter candidates.",
      path: "/recruiter/dashboard/candidates",
      color: "from-fuchsia-500 to-fuchsia-600",
      loadingMessage: "Opening Candidate Directory...",
    },
    {
      icon: (
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="inline-flex"
        >
          <FaDatabase className="text-3xl" />
        </motion.span>
      ),
      title: "Bookmarked Candidates",
      description: "Access your saved candidates.",
      path: "/recruiter/dashboard/bookmarks",
      color: "from-purple-500 to-purple-600",
      loadingMessage: "Opening Bookmarked Candidates...",
    },
    {
      icon: (
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: "mirror" }}
          className="inline-flex"
        >
          <FaFlag className="text-3xl" />
        </motion.span>
      ),
      title: "Reported/Contacted Candidates",
      description: "Manage reported/contacted candidates.",
      path: "/recruiter/dashboard/reported-contacted",
      color: "from-orange-500 to-orange-600",
      loadingMessage: "Opening Reported/Contacted...",
    },
    {
      icon: (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="inline-flex"
        >
          <FaCog className="text-3xl" />
        </motion.span>
      ),
      title: "Settings",
      description: "Manage your preferences and account.",
      path: "/recruiter/dashboard/settings",
      color: "from-gray-500 to-gray-600",
      loadingMessage: "Opening Settings...",
    },
  ];

  const handleNavigate = async (path, message) => {
    setIsLoading(true);
    setLoadingMessage(message);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate(path);
    setTimeout(() => setIsLoading(false), 1000);
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
            Welcome, Recruiter!
          </motion.h1>
          <motion.p className="text-lg opacity-90" variants={fadeUp} custom={2}>
            Find the right talent faster. 🚀
          </motion.p>
        </motion.div>

        {/* Overview Card (non-navigation) */}
        <motion.div
          variants={fadeUp}
          custom={2.5}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg text-white p-6"
        >
          {loadingOverview ? (
            <div className="text-white/80">Loading overview...</div>
          ) : (
            <div className="space-y-6">
              {/* Welcome + profile */}
              {profile && (
                <div className="flex items-center gap-4">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Recruiter"
                      className="w-14 h-14 rounded-full object-cover border border-white/30"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center border border-white/30">
                      <span className="text-gray-400 text-xl">👤</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">
                      Welcome back, {profile.fullName || "Recruiter"}
                    </h3>
                    <p className="text-white/70">
                      {profile.company || "Your Company"}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick stats */}
              {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                    <h4 className="text-2xl font-bold">{stats.viewedCount}</h4>
                    <p className="text-white/70">Candidates Viewed</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                    <h4 className="text-2xl font-bold">
                      {stats.bookmarkedCount}
                    </h4>
                    <p className="text-white/70">Bookmarked</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                    <h4 className="text-2xl font-bold">
                      {stats.contactedCount}
                    </h4>
                    <p className="text-white/70">Contacted</p>
                  </div>
                </div>
              )}

              {/* Recently Viewed (compact) */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Recently Viewed</h4>
                  {recentCandidates && recentCandidates.length > 0 ? (
                    <div className="space-y-3">
                      {recentCandidates.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10"
                        >
                          <img
                            src={
                              item.candidateId?.profilePicture ||
                              "/default-avatar.png"
                            }
                            alt="Candidate"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">
                              {item.candidateId?.fullName ||
                                "Unnamed Candidate"}
                            </p>
                            <p className="text-sm text-white/70 truncate max-w-[240px]">
                              {item.candidateId?.bio || "No bio available"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70">No candidates viewed yet.</p>
                  )}
                </div>

                {/* Suggested (compact) */}
                <div>
                  <h4 className="font-semibold mb-2">Suggested Candidates</h4>
                  {suggestedCandidates && suggestedCandidates.length > 0 ? (
                    <div className="space-y-3">
                      {suggestedCandidates.slice(0, 3).map((c, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10"
                        >
                          <img
                            src={c.profilePicture || "/default-avatar.png"}
                            alt="Candidate"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">
                              {c.fullName || "Unnamed Candidate"}
                            </p>
                            <p className="text-sm text-white/70 truncate max-w-[240px]">
                              {c.bio || "No bio available"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70">No suggestions yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
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
              <div
                className={`lg:hidden bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg text-white`}
              >
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
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                      <div className="p-3 bg-white/20 rounded-full">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="flex items-center justify-center h-full text-center">
                      <p className="text-sm opacity-90 px-6 whitespace-pre-line max-w-[90%] mx-auto">
                        {item.description}
                      </p>
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

          .flip-card-front,
          .flip-card-back {
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px,
              rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
              rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
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
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .flip-card-back {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: rotateY(180deg);
          }
        `}</style>

        {/* Mobile Note */}
        <motion.div
          className="md:hidden p-4 bg-white/5 rounded-xl border border-white/10 text-white/70 text-center text-sm"
          variants={fadeUp}
          custom={4}
        >
          Use the menu button (☰) in the top-left to access all features on
          mobile
        </motion.div>

        {/* Loading Overlay */}
        <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
      </motion.div>
    </AnimatePresence>
  );
}
