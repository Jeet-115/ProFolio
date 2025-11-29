import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Settings = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme.palette.divider}`,
            gap: 2,
          }}
        >
          {/* Themed rotating settings logo */}
          <Box sx={{ p: 2, mb: 1, color: theme.palette.text.primary }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              style={{ display: 'inline-flex' }}
            >
              <SettingsOutlinedIcon sx={{ fontSize: { xs: 90, sm: 120 } }} />
            </motion.div>
          </Box>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
          >
            Settings Coming Soon
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, color: theme.palette.text.secondary }}
          >
            We’re crafting a delightful, customizable settings experience. Check back shortly!
          </Typography>

          {/* Subtle loader dots remain for continuity */}
          <Box sx={{ display: 'flex', gap: 1.2, mt: 2, mb: 1 }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  display: 'inline-block',
                  background: theme.palette.primary.main,
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </Box>

          <Button variant="outlined" color="primary" disabled sx={{ mt: 1 }}>
            Under Construction
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Settings;
