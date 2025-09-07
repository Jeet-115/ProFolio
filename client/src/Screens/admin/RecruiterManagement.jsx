import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select
} from '@mui/material';
import { Search as SearchIcon, Visibility as VisibilityIcon, Refresh as RefreshIcon, Business as BusinessIcon } from '@mui/icons-material';
import {
  getAllRecruiters,
  getRecruiterById,
  getRecruiterReportsMade,
  getRecruiterBookmarks,
  getRecruiterContacted,
} from "../../services/recruiterService";

export default function RecruiterManagement() {
  const theme = useTheme();
  const [recruiters, setRecruiters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reports, setReports] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [contacted, setContacted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchRecruiters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllRecruiters();
      const list = res.data || [];
      setRecruiters(list);
      setFiltered(list);
    } catch (err) {
      console.error('Error fetching recruiters:', err);
      setSnackbar({ open: true, message: 'Failed to load recruiters', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRecruiters(); }, [fetchRecruiters]);

  useEffect(() => {
    const term = search.toLowerCase();
    const f = recruiters.filter(r =>
      r.fullName?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.companyDetails?.companyName?.toLowerCase().includes(term)
    );
    setFiltered(f);
  }, [search, recruiters]);

  const openDetails = async (id) => {
    try {
      setLoading(true);
      const res = await getRecruiterById(id);
      setSelected(res.data);
      const [r1, r2, r3] = await Promise.all([
        getRecruiterReportsMade(id),
        getRecruiterBookmarks(id),
        getRecruiterContacted(id),
      ]);
      setReports(r1.data?.reportsMade || []);
      setBookmarks(r2.data || []);
      setContacted(r3.data || []);
      setTab(0);
    } catch (err) {
      console.error('Error fetching recruiter details:', err);
      setSnackbar({ open: true, message: 'Failed to load recruiter details', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const closeDetails = () => setSelected(null);

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Recruiter Management</Typography>
        <Typography variant="body2" color="text.secondary">Manage recruiter profiles and review their activity</Typography>
      </Box>

      {/* Filters/Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, email or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <Button variant="contained" startIcon={<RefreshIcon />} onClick={fetchRecruiters}>Refresh</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recruiters Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh"><CircularProgress /></Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.length === 0 ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography align="center" color="text.secondary">No recruiters found</Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            filtered.map((rec, idx) => (
              <Grid item xs={12} sm={6} md={4} key={rec._id || rec.id || `rec-${idx}`}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar>{rec.fullName?.charAt(0) || 'R'}</Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{rec.fullName || 'Unnamed Recruiter'}</Typography>
                        <Typography variant="caption" color="text.secondary">{rec.email}</Typography>
                      </Box>
                    </Box>
                    <Chip icon={<BusinessIcon />} label={rec.companyDetails?.companyName || 'No company'} size="small" variant="outlined" />
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} onClick={() => openDetails(rec._id)}>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Details Dialog */}
      <Dialog open={Boolean(selected)} onClose={closeDetails} fullWidth maxWidth="md">
        <DialogTitle>Recruiter Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56 }}>{selected.fullName?.charAt(0) || 'R'}</Avatar>
                <Box>
                  <Typography variant="h6">{selected.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">{selected.email}</Typography>
                  <Typography variant="body2" color="text.secondary">{selected.companyDetails?.companyName || 'N/A'}</Typography>
                </Box>
              </Box>
              <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }} variant="scrollable" allowScrollButtonsMobile>
                <Tab label="Details" />
                <Tab label={`Reports (${reports.length})`} />
                <Tab label={`Bookmarks (${bookmarks.length})`} />
                <Tab label={`Contacted (${contacted.length})`} />
              </Tabs>
              {tab === 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Company</Typography>
                  <Typography variant="body1" gutterBottom>{selected.companyDetails?.companyName || 'N/A'}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary">About</Typography>
                  <Typography variant="body2">{selected.companyDetails?.about || '—'}</Typography>
                </Box>
              )}
              {tab === 1 && (
                <Box>
                  {reports.length === 0 ? (
                    <Typography color="text.secondary">No reports made by this recruiter.</Typography>
                  ) : (
                    <Grid container spacing={1}>
                      {reports.map((rep, rIdx) => (
                        <Grid item xs={12} key={rep._id || rep.id || `rep-${rIdx}`}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2">Candidate: {rep.candidateId?.fullName || 'Unknown'} ({rep.candidateId?.email || 'No email'})</Typography>
                              <Typography variant="body2">Message: {rep.message}</Typography>
                              <Typography variant="caption" color="text.secondary">Reported At: {new Date(rep.reportedAt).toLocaleString()}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              )}
              {tab === 2 && (
                <Box>
                  {bookmarks.length === 0 ? (
                    <Typography color="text.secondary">No bookmarks by this recruiter.</Typography>
                  ) : (
                    <Grid container spacing={1}>
                      {bookmarks.map((bm, bIdx) => (
                        <Grid item xs={12} key={bm._id || bm.id || `bm-${bIdx}`}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2">{bm.candidateId?.fullName || 'Unknown'} ({bm.candidateId?.email || 'No email'})</Typography>
                              <Typography variant="caption" color="text.secondary">Bookmarked At: {new Date(bm.bookmarkedAt).toLocaleString()}</Typography>
                              {bm.notes && <Typography variant="body2">Notes: {bm.notes}</Typography>}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              )}
              {tab === 3 && (
                <Box>
                  {contacted.length === 0 ? (
                    <Typography color="text.secondary">No candidates contacted by this recruiter.</Typography>
                  ) : (
                    <Grid container spacing={1}>
                      {contacted.map((ct, cIdx) => (
                        <Grid item xs={12} key={ct._id || ct.id || `ct-${cIdx}`}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2">{ct.candidateId?.fullName || 'Unknown'} ({ct.candidateId?.email || 'No email'})</Typography>
                              <Typography variant="caption" color="text.secondary">Contacted At: {new Date(ct.contactedAt).toLocaleString()}</Typography>
                              <Typography variant="body2">Method: {ct.method}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
