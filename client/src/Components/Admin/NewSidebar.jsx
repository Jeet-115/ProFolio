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
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import axios from "../../services/axiosInstance";

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
const StyledSidebar = styled(motion.aside)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '280px',
  background: theme.palette.background.paper,
  boxShadow: '4px 0 20px rgba(0, 0, 0, 0.06)',
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 16px',
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: 'auto',
  [theme.breakpoints.up('md')]: {
    width: '320px', // roomier on tablets
  },
  [theme.breakpoints.up('lg')]: {
    width: '280px', // align with persistent desktop width
  },
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.default,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.accent?.main || theme.palette.primary.main,
    opacity: 0.3,
    borderRadius: '10px',
    '&:hover': {
      background: theme.palette.primary.hover || theme.palette.primary.dark,
    },
  },
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 0 32px',
  marginBottom: '16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LogoText = styled('span')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.accent?.main || '#FFB74D'} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginLeft: 0,
}));

const NavItems = styled('nav')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px 0',
  flex: 1,
});

const NavItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  fontWeight: active ? 600 : 400,
  position: 'relative',
  '&:hover': {
    backgroundColor: active ? (theme.palette.primary.hover || theme.palette.primary.dark) : theme.palette.neutral?.main || theme.palette.background.default,
    color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
    transform: 'translateX(4px)',
    '& .nav-icon': {
      color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
    },
  },
}));

const NavIcon = styled('span')(({ theme, active }) => ({
  fontSize: '1.25rem',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  transition: 'all 0.3s ease',
}));

const NavText = styled('span')({
  fontSize: '0.9375rem',
  transition: 'all 0.3s ease',
});

// Active indicator uses theme colors
const Indicator = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  right: '16px',
  width: '6px',
  height: '24px',
  borderRadius: '9999px',
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.accent?.main || '#FFB74D'})`,
}));

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
        <Indicator
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

function Sidebar({ open, onClose, onNavigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();
  const navigate = useNavigate();

  // Close temporary drawer state when switching to desktop
  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  // Sync controlled open prop on mobile
  useEffect(() => {
    if (typeof open === 'boolean') {
      setIsOpen(open);
    }
  }, [open]);

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {});
    } catch (e) {
      // ignore; navigate anyway
    } finally {
      if (isMobile) setIsOpen(false);
      onClose && onClose();
      navigate('/login');
    }
  };

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
      label: "User Management", 
      path: "/admin/users",
      tooltip: "Manage Users"
    },
    { 
      icon: FaUserTie, 
      label: "Recruiter Management", 
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
    {
      icon: FaSignOutAlt,
      label: "Logout",
      onClick: handleLogout,
      tooltip: "Logout",
    },
  ];

  // Handle navigation
  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      if (isMobile) {
        setIsOpen(false);
        onNavigation && onNavigation();
        onClose && onClose();
      }
    }
  };

  // Render sidebar content
  const renderSidebarContent = () => (
    <>
      <LogoContainer>
        <LogoText>ProFolio</LogoText>
      </LogoContainer>
      
      <NavItems>
        {menuItems.map((item) => (
          <motion.div
            key={item.path || item.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SidebarItem
              icon={item.icon}
              label={item.label}
              active={item.path ? location.pathname === item.path : false}
              onClick={() => (item.onClick ? item.onClick() : handleNavigate(item.path))}
              tooltip={item.tooltip}
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
      {/* Mobile Toggle Button (only when uncontrolled) */}
      {typeof open !== 'boolean' && (
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
      )}

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
              onClick={() => {
                setIsOpen(false);
                onClose && onClose();
              }}
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
                  onClick={() => {
                    setIsOpen(false);
                    onClose && onClose();
                  }}
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

export default Sidebar;
