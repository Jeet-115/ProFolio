import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCog,
  FaChartLine,
  FaUserTie,
  FaBoxes,
  FaHome,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Tooltip } from "@mui/material";

// Animation variants
const sidebarVariants = {
  hidden: { x: -320, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: { 
    x: -320, 
    opacity: 0, 
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

// Styled components
const StyledSidebar = styled(motion.aside)({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '280px',
  background: 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)',
  boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
  zIndex: 1100,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 16px',
  borderRight: '1px solid rgba(255, 255, 255, 0.05)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(245, 158, 11, 0.3)',
    borderRadius: '10px',
    '&:hover': {
      background: 'rgba(245, 158, 11, 0.5)',
    },
  },
});

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 0 32px',
  marginBottom: '16px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
});

const LogoText = styled('span')({
  fontSize: '1.5rem',
  fontWeight: 700,
  background: 'linear-gradient(45deg, #F59E0B 0%, #FDE68A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginLeft: '12px',
});

const NavItems = styled('nav')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px 0',
  flex: 1,
});

const NavItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: active ? '#0A0A0A' : '#F3F4F6',
  backgroundColor: active ? 'rgba(245, 158, 11, 0.9)' : 'transparent',
  fontWeight: active ? 600 : 400,
  position: 'relative',
  '&:hover': {
    backgroundColor: active ? 'rgba(245, 158, 11, 1)' : 'rgba(255, 255, 255, 0.05)',
    color: active ? '#0A0A0A' : '#FDE68A',
    transform: 'translateX(4px)',
    '& .nav-icon': {
      color: active ? '#0A0A0A' : '#F59E0B',
    },
  },
}));

const NavIcon = styled('span')(({ active }) => ({
  fontSize: '1.25rem',
  color: active ? '#0A0A0A' : '#9CA3AF',
  transition: 'all 0.3s ease',
}));

const NavText = styled('span')({
  fontSize: '0.9375rem',
  transition: 'all 0.3s ease',
});

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick, tooltip = '' }) => {
  const item = (
    <NavItem 
      active={active}
      onClick={onClick}
      className="group"
    >
      <NavIcon active={active} className="nav-icon">
        {typeof Icon === 'function' ? <Icon /> : Icon}
      </NavIcon>
      <NavText>{label}</NavText>
      {active && (
        <motion.div
          style={{
            position: 'absolute',
            right: '16px',
            width: '6px',
            height: '24px',
            borderRadius: '9999px',
            background: 'linear-gradient(to bottom, #F59E0B, #FDE68A)',
          }}
          layoutId="activeIndicator"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      )}
    </NavItem>
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement="right" arrow>
      {item}
    </Tooltip>
  ) : (
    item
  );
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const menuItems = [
    { 
      icon: FaHome, 
      label: "Dashboard", 
      path: "/admin",
      tooltip: "Admin Dashboard"
    },
    { 
      icon: FaUserCog, 
      label: "Users", 
      path: "/admin/users",
      tooltip: "Manage Users"
    },
    { 
      icon: FaUserTie, 
      label: "Recruiters", 
      path: "/admin/recruiters",
      tooltip: "Manage Recruiters"
    },
    { 
      icon: FaBoxes, 
      label: "Templates", 
      path: "/admin/templates",
      tooltip: "Manage Templates"
    },
    { 
      icon: FaChartLine, 
      label: "Analytics", 
      path: "/admin/analytics",
      tooltip: "View Analytics"
    },
    { 
      icon: FaCog, 
      label: "Settings", 
      path: "/admin/settings",
      tooltip: "Settings"
    },
  ];

  // Handle navigation
  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  // Render sidebar content
  const renderSidebarContent = () => (
    <>
      <LogoContainer>
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #F59E0B',
          }}
        />
        <LogoText>ProFolio</LogoText>
      </LogoContainer>
      
      <NavItems>
        {menuItems.map((item) => (
          <motion.div
            key={item.path}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SidebarItem
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              tooltip={isMobile ? '' : item.tooltip}
            />
          </motion.div>
        ))}
      </NavItems>
      
      <Box sx={{ 
        mt: 'auto', 
        pt: 2, 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)' 
      }}>
        {/* Footer content can go here */}
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        style={{
          display: isMobile ? 'flex' : 'none',
          position: 'fixed',
          top: '24px',
          left: '24px',
          zIndex: 1100,
          padding: '8px',
          borderRadius: '50%',
          background: '#1A1A1A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#F59E0B',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaBars size={20} />
      </motion.button>

      {/* Desktop Sidebar */}
      <StyledSidebar
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        style={{ display: isMobile ? 'none' : 'flex' }}
      >
        {renderSidebarContent()}
      </StyledSidebar>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1099,
                backdropFilter: 'blur(4px)',
              }}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Mobile Sidebar */}
            <StyledSidebar
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaTimes size={20} />
                </motion.button>
              </Box>
              {renderSidebarContent()}
            </StyledSidebar>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
                </div>
                <h2 className="text-xl font-bold tracking-wide outfit text-white">
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
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex w-64 bg-[#00ACC1] text-white p-6 flex-col gap-6 shadow-lg rounded-tr-3xl rounded-br-3xl"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-white/20 p-2 rounded-full shadow-lg">
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
