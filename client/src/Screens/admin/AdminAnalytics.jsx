import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import InsightsIcon from "@mui/icons-material/Insights";
import {
  getUserAnalytics,
  getRecruiterAnalytics,
  getAdminAnalytics,
} from "../../services/adminAnalyticsService";

export default function AdminAnalytics() {
  const theme = useTheme();
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [recruiterAnalytics, setRecruiterAnalytics] = useState(null);
  const [adminAnalytics, setAdminAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, recruiterRes, adminRes] = await Promise.all([
          getUserAnalytics(),
          getRecruiterAnalytics(),
          getAdminAnalytics(),
        ]);

        setUserAnalytics(userRes.data);
        setRecruiterAnalytics(recruiterRes.data);
        setAdminAnalytics(adminRes.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const StatRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value}</Typography>
    </Box>
  );

  const SectionTitle = ({ icon: Icon, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
      <Icon color="primary" />
      <Typography variant="h6" fontWeight={700}>{title}</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        {/* User Analytics */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <SectionTitle icon={PeopleIcon} title="User Analytics" />
              <Divider sx={{ mb: 1.5 }} />
              <StatRow label="Total Resumes" value={userAnalytics.totalResumes} />
              <StatRow label="Resumes (Builder)" value={userAnalytics.resumes} />
              <StatRow label="Resumes (Template)" value={userAnalytics.templateResumes} />
              <StatRow label="Last Resume Updated" value={userAnalytics.lastResumeUpdated || 'N/A'} />
              <Divider sx={{ my: 1.5 }} />
              <StatRow label="Total Portfolios" value={userAnalytics.totalPortfolios} />
              <StatRow label="Portfolios (Builder)" value={userAnalytics.portfolios} />
              <StatRow label="Portfolios (Template)" value={userAnalytics.templatePortfolios} />
              <StatRow label="Last Portfolio Updated" value={userAnalytics.lastPortfolioUpdated || 'N/A'} />
              <Divider sx={{ my: 1.5 }} />
              <StatRow label="Skills Count" value={userAnalytics.skillsCount} />
              <StatRow label="Experience Level" value={userAnalytics.experienceLevel || 'Not set'} />
              <StatRow label="Recruiter Consent" value={userAnalytics.recruiterConsent ? 'Enabled' : 'Disabled'} />
              <StatRow label="Reports Received" value={userAnalytics.reportsReceived} />
            </CardContent>
          </Card>
        </Grid>

        {/* Recruiter Analytics */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <SectionTitle icon={WorkIcon} title="Recruiter Analytics" />
              <Divider sx={{ mb: 1.5 }} />
              <StatRow label="Viewed Candidates" value={recruiterAnalytics.viewedCandidates} />
              <StatRow label="Bookmarked Candidates" value={recruiterAnalytics.bookmarkedCandidates} />
              <StatRow label="Total Contacts" value={recruiterAnalytics.contactedCandidates} />
              <Divider sx={{ my: 1.5 }} />
              <StatRow label="Contacts by Email" value={recruiterAnalytics.contactedByMethod?.email} />
              <StatRow label="Contacts by Message" value={recruiterAnalytics.contactedByMethod?.message} />
              <Divider sx={{ my: 1.5 }} />
              <StatRow label="Reports Made" value={recruiterAnalytics.reportsMade} />
              <StatRow label="Job Roles Listed" value={recruiterAnalytics.jobRoles} />
            </CardContent>
          </Card>
        </Grid>

        {/* Admin Analytics */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <SectionTitle icon={InsightsIcon} title="Admin Analytics" />
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Users Breakdown</Typography>
              <StatRow label="Total Users" value={adminAnalytics.users.total} />
              <StatRow label="Normal Users" value={adminAnalytics.users.userCount} />
              <StatRow label="Recruiters" value={adminAnalytics.users.recruiterCount} />
              <StatRow label="Admins" value={adminAnalytics.users.adminCount} />
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Content Creation</Typography>
              <StatRow label="Resumes" value={adminAnalytics.content.resumes} />
              <StatRow label="Template Resumes" value={adminAnalytics.content.templateResumes} />
              <StatRow label="Portfolios" value={adminAnalytics.content.portfolios} />
              <StatRow label="Template Portfolios" value={adminAnalytics.content.templatePortfolios} />
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Recruiter Activity</Typography>
              <StatRow label="Total Views" value={adminAnalytics.recruiterActivity.totalViews} />
              <StatRow label="Total Bookmarks" value={adminAnalytics.recruiterActivity.totalBookmarks} />
              <StatRow label="Total Contacts" value={adminAnalytics.recruiterActivity.totalContacts} />
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Reports</Typography>
              <StatRow label="Reports Received" value={adminAnalytics.reports.totalReportsReceived} />
              <StatRow label="Reports Made" value={adminAnalytics.reports.totalReportsMade} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
