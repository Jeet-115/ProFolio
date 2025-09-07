import React from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import Sidebar from "../Components/Admin/NewSidebar";
import luxuryGoldTheme from "../theme/luxuryGoldTheme";

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
        {/* Sidebar (uncontrolled so it renders its own mobile toggle and overlay) */}
        <Box component="nav" sx={{ width: { lg: 280 }, flexShrink: { lg: 0 } }}>
          <Sidebar />
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
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
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
