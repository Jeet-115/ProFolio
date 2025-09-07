import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  ToggleOn as EnableIcon,
  ToggleOff as DisableIcon,
} from '@mui/icons-material';
import {
  getTemplatePortfolios,
  deleteTemplatePortfolio,
  updateTemplatePortfolio,
} from '../../services/templatePortfolioService';

const TemplateManagement = () => {
  const theme = useTheme();
  const [templates, setTemplates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const menuOpen = Boolean(anchorEl);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await getTemplatePortfolios();
      const list = res.data || [];
      setTemplates(list);
      setFiltered(list);
    } catch (err) {
      console.error('Failed to load templates', err);
      setSnackbar({ open: true, message: 'Failed to load templates', severity: 'error' });
    }
  }, []);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  useEffect(() => {
    const term = search.toLowerCase();
    const f = templates.filter(t =>
      t.name?.toLowerCase().includes(term) ||
      t.category?.toLowerCase().includes(term)
    );
    setFiltered(f);
  }, [search, templates]);

  const handleMenu = (e, id) => {
    setAnchorEl(e.currentTarget);
    setMenuId(id);
  };
  const closeMenu = () => { setAnchorEl(null); setMenuId(null); };

  const handleDelete = async (id) => {
    try {
      await deleteTemplatePortfolio(id);
      setSnackbar({ open: true, message: 'Template deleted', severity: 'success' });
      fetchTemplates();
    } catch (err) {
      console.error('Delete failed', err);
      setSnackbar({ open: true, message: 'Failed to delete template', severity: 'error' });
    }
  };

  const toggleEnabled = async (tpl) => {
    try {
      await updateTemplatePortfolio(tpl._id, { enabled: !tpl.enabled });
      setSnackbar({ open: true, message: `Template ${tpl.enabled ? 'disabled' : 'enabled'}`, severity: 'success' });
      fetchTemplates();
    } catch (err) {
      console.error('Update failed', err);
      setSnackbar({ open: true, message: 'Failed to update template', severity: 'error' });
    }
  };

  const TemplateCard = ({ tpl }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {tpl.previewUrl && (
        <CardMedia
          component="img"
          height="160"
          image={tpl.previewUrl}
          alt={tpl.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{tpl.name || 'Untitled Template'}</Typography>
            <Typography variant="caption" color="text.secondary">{tpl.category || 'General'}</Typography>
          </Box>
          <Chip
            label={tpl.enabled ? 'Enabled' : 'Disabled'}
            color={tpl.enabled ? 'success' : 'default'}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" startIcon={<VisibilityIcon />}>View</Button>
          <Button size="small" variant="contained" startIcon={<EditIcon />}>Edit</Button>
        </Box>
        <IconButton onClick={(e) => handleMenu(e, tpl._id)}>
          <MoreIcon />
        </IconButton>
      </CardActions>
      <Menu anchorEl={anchorEl} open={menuOpen && menuId === tpl._id} onClose={closeMenu}>
        <MenuItem onClick={() => { closeMenu(); toggleEnabled(tpl); }}>
          {tpl.enabled ? <DisableIcon fontSize="small" /> : <EnableIcon fontSize="small" />}
          <Box component="span" sx={{ ml: 1 }}>{tpl.enabled ? 'Disable' : 'Enable'}</Box>
        </MenuItem>
        <MenuItem onClick={() => { closeMenu(); setConfirm({ open: true, id: tpl._id }); }}>
          <DeleteIcon fontSize="small" />
          <Box component="span" sx={{ ml: 1, color: 'error.main' }}>Delete</Box>
        </MenuItem>
      </Menu>
    </Card>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Template Management</Typography>
        <Typography variant="body2" color="text.secondary">Manage portfolio templates, toggle availability, and edit details</Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search templates by name or category..."
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
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button variant="contained">New Template</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {filtered.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography align="center" color="text.secondary">No templates found</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          filtered.map((tpl, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tpl._id || tpl.id || `tpl-${idx}`}>
              <TemplateCard tpl={tpl} />
            </Grid>
          ))
        )}
      </Grid>

      {/* Confirm Delete */}
      <Dialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })}>
        <DialogTitle>Delete template?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm({ open: false, id: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => { handleDelete(confirm.id); setConfirm({ open: false, id: null }); }}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TemplateManagement;
