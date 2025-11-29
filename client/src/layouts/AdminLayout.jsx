import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { CssBaseline, Box, useMediaQuery, IconButton, Typography } from "@mui/material";
import Sidebar from "../Components/Admin/NewSidebar";
import luxuryGoldTheme from "../theme/luxuryGoldTheme";
import MenuIcon from "@mui/icons-material/Menu";

// Create MUI theme with responsive typography
let theme = createTheme({
  ...luxuryGoldTheme,
  components: {
    ...luxuryGoldTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: luxuryGoldTheme.palette.background.default,
          color: luxuryGoldTheme.palette.text.primary,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: luxuryGoldTheme.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            background: luxuryGoldTheme.palette.primary.main,
            borderRadius: '4px',
            '&:hover': {
              background: luxuryGoldTheme.palette.primary.dark,
            },
          },
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function AdminLayout() {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(v => !v);
  const handleCloseDrawer = () => setMobileOpen(false);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {/* Sidebar (controlled on mobile for external toggle) */}
        <Box component="nav" sx={{ width: { lg: 280 }, flexShrink: { lg: 0 } }}>
          <AnimatePresence>
            {isMobile && mobileOpen && (
              <Box
                sx={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: 1200,
                  backdropFilter: 'blur(2px)'
                }}
                onClick={handleCloseDrawer}
              />
            )}
          </AnimatePresence>
          <Sidebar open={isMobile ? mobileOpen : undefined} onClose={handleCloseDrawer} />
        </Box>
        
        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100% - 280px)` },
            ml: { lg: '280px' },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          {/* Sticky minimal top bar with hamburger on mobile/tablet */}
          {isMobile && (
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1400,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                height: 56,
                px: 1.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                backdropFilter: 'saturate(180%) blur(4px)'
              }}
            >
              <IconButton onClick={handleDrawerToggle} aria-label="open sidebar" sx={{ color: theme.palette.text.primary }}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/admin')}
                title="Go to Admin Dashboard"
              >
                Admin
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              maxWidth: { xs: '100%', md: 1200 },
              mx: 'auto',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  p: { xs: 2, sm: 3 },
                  minHeight: 'calc(100vh - 180px)',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Outlet />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLayout;
