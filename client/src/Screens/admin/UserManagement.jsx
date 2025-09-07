import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  MenuItem,
  Select,
  Chip,
  Tooltip,
  TextField,
  InputAdornment,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Event as EventIcon,
  AdminPanelSettings as AdminIcon,
  PersonOutline as UserIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import {
  getAllUsers,
  updateUserRole,
  deleteUserById,
  getUserReports,
} from '../../services/adminUserService';

const ROLE_OPTIONS = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
];

const STATUS_COLORS = {
  active: 'success',
  inactive: 'default',
  suspended: 'warning',
  banned: 'error',
};

export default function UserManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      showSnackbar('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(0); // Reset to first page on search
  }, [searchTerm, users]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      fetchUsers();
      showSnackbar('User role updated successfully', 'success');
    } catch (err) {
      console.error('Failed to update role:', err);
      showSnackbar('Failed to update user role', 'error');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUserById(userId);
      fetchUsers();
      showSnackbar('User deleted successfully', 'success');
    } catch (err) {
      console.error('Failed to delete user:', err);
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChip = (status) => (
    <Chip
      label={status?.charAt(0).toUpperCase() + status?.slice(1) || 'Active'}
      color={STATUS_COLORS[status] || 'default'}
      size="small"
      variant="outlined"
    />
  );

  const getRoleChip = (role) => {
    const roleConfig = {
      admin: { icon: <AdminIcon fontSize="small" />, color: 'error' },
      user: { icon: <UserIcon fontSize="small" />, color: 'primary' },
      moderator: { icon: <EditIcon fontSize="small" />, color: 'warning' },
    }[role] || { icon: null, color: 'default' };

    return (
      <Chip
        icon={roleConfig.icon}
        label={role?.charAt(0).toUpperCase() + role?.slice(1) || 'User'}
        color={roleConfig.color}
        size="small"
        variant="outlined"
        sx={{ minWidth: 90 }}
      />
    );
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }
    }
  };

  // Handle reports
  const handleViewReports = async (user) => {
    try {
      setSelectedUser(user);
      const { data } = await getUserReports(user._id);
      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Auth Provider</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="border p-2">{u.fullName || u.username}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="user">User</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="border p-2">{u.status}</td>
                <td className="border p-2">{u.authProvider}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleViewReports(u)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Reports
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reports Modal */}
      {reports && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-1/2 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Reports for {selectedUser.fullName || selectedUser.email}
            </h2>

            <div className="mb-4">
              <h3 className="font-semibold">Reports Received:</h3>
              {reports.reportsReceived.length === 0 ? (
                <p className="text-sm text-gray-500">No reports received.</p>
              ) : (
                <ul className="list-disc ml-6">
                  {reports.reportsReceived.map((r) => (
                    <li key={r._id}>
                      From: {r.recruiterId?.fullName || "Unknown"} –{" "}
                      {r.message} ({new Date(r.reportedAt).toLocaleString()})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Reports Made:</h3>
              {reports.reportsMade.length === 0 ? (
                <p className="text-sm text-gray-500">No reports made.</p>
              ) : (
                <ul className="list-disc ml-6">
                  {reports.reportsMade.map((r) => (
                    <li key={r._id}>
                      Against: {r.candidateId?.fullName || "Unknown"} –{" "}
                      {r.message} ({new Date(r.reportedAt).toLocaleString()})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => {
                setReports(null);
                setSelectedUser(null);
              }}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
