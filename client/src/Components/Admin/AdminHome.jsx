import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import StorageIcon from "@mui/icons-material/Storage";
import BoltIcon from "@mui/icons-material/Bolt";

const StatusDot = ({ color = 'success.main' }) => (
  <Box
    sx={{
      width: { xs: 10, md: 12 },
      height: { xs: 10, md: 12 },
      borderRadius: '50%',
      bgcolor: color,
      boxShadow: (theme) => `0 0 0 3px ${theme.palette.background.paper}`,
    }}
  />
);

function AdminUsersCount() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let mounted = true;
    axios
      .get("/admin/users")
      .then(({ data }) => {
        if (mounted) setCount(Array.isArray(data) ? data.length : null);
      })
      .catch(() => {
        if (mounted) setCount(null);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Typography
      fontWeight={700}
      color="text.primary"
      aria-live="polite"
      sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' } }}
    >
      {count == null ? "—" : count}
    </Typography>
  );
}

const MetricCard = ({ icon: Icon, label, children, gradient }) => (
  <Card sx={{
    background: gradient,
    border: (theme) => `1px solid ${theme.palette.divider}`,
  }}>
    <CardContent sx={{ p: { xs: 2, md: 3.5 } }}>
      <Stack direction="row" spacing={{ xs: 2, md: 2.5 }} alignItems="center">
        <Box sx={{
          width: { xs: 44, md: 52 }, height: { xs: 44, md: 52 }, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: (theme) => theme.palette.background.paper,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}>
          <Icon sx={{ fontSize: { xs: 24, md: 28 } }} color="primary" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>{label}</Typography>
          {children}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const AdminHome = () => {
  const theme = useTheme();
  const gradient = `linear-gradient(135deg, ${theme.palette.neutral.main} 0%, ${theme.palette.accent.light} 100%)`;

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography fontWeight={700} sx={{ mb: { xs: 2, md: 3 }, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Welcome, Admin!
      </Typography>

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard icon={PeopleIcon} label="Total Users" gradient={gradient}>
            <AdminUsersCount />
          </MetricCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard icon={StorageIcon} label="Files Stored" gradient={gradient}>
            <Typography fontWeight={700} color="text.primary" sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' } }}>—</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard icon={BoltIcon} label="Active Sessions" gradient={gradient}>
            <Typography fontWeight={700} color="text.primary" sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' } }}>—</Typography>
          </MetricCard>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* System Status */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>System Status</Typography>
              <Stack spacing={{ xs: 1, md: 1.5 }}>
                <Stack direction="row" spacing={{ xs: 1, md: 1.5 }} alignItems="center">
                  <StatusDot />
                  <Typography variant="body2">API</Typography>
                </Stack>
                <Stack direction="row" spacing={{ xs: 1, md: 1.5 }} alignItems="center">
                  <StatusDot />
                  <Typography variant="body2">Database</Typography>
                </Stack>
                <Stack direction="row" spacing={{ xs: 1, md: 1.5 }} alignItems="center">
                  <StatusDot />
                  <Typography variant="body2">Storage</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHome;
