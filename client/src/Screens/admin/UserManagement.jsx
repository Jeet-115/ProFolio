// src/pages/admin/UserManagement.jsx
import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUserById,
  getUserReports,
} from "../../services/adminUserService";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role update
  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserById(id);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
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
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold luxury-gold-text luxury-heading">User Management</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white shadow-lg hover:from-[#F57F17] hover:to-[#E65100] transition-all luxury-btn luxury-focus text-sm sm:text-base"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-48 rounded-2xl border border-[#F9A825]/20 bg-gradient-to-br from-white to-[#FFFEF7] data-loading" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#F9A825]/30 shadow-xl bg-white">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#FFF8E1]">
              <tr className="text-left text-[#E65100]">
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Email</th>
                <th className="p-3 text-sm font-semibold">Role</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold">Auth Provider</th>
                <th className="p-3 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={u._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-[#FFFEF7]"} hover:bg-[#FFFDE7] transition-colors`}
                >
                  <td className="p-3 text-sm">{u.fullName || u.username}</td>
                  <td className="p-3 text-sm">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border border-[#F9A825]/40 rounded-lg p-2 text-sm luxury-focus"
                    >
                      <option value="user">User</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 text-sm">{u.status}</td>
                  <td className="p-3 text-sm">{u.authProvider}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewReports(u)}
                        className="px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white shadow hover:from-[#F57F17] hover:to-[#E65100] transition-all luxury-btn luxury-focus"
                      >
                        Reports
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-all luxury-focus"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reports Modal */}
      {reports && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white to-[#FFFEF7] p-4 sm:p-6 rounded-2xl w-full max-w-[90vw] sm:max-w-2xl shadow-2xl border border-[#F9A825]/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold luxury-gold-text luxury-heading">
                Reports for {selectedUser.fullName || selectedUser.email}
              </h2>
              <button
                onClick={() => {
                  setReports(null);
                  setSelectedUser(null);
                }}
                className="px-3 py-1 rounded-lg bg-[#FFF8E1] text-[#E65100] hover:bg-[#FFE082] transition-colors luxury-focus self-start sm:self-auto"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#E65100] mb-2">Reports Received</h3>
                {reports.reportsReceived.length === 0 ? (
                  <p className="text-sm text-[#E65100]/70">No reports received.</p>
                ) : (
                  <ul className="list-disc ml-6 space-y-1">
                    {reports.reportsReceived.map((r) => (
                      <li key={r._id} className="text-sm">
                        From: {r.recruiterId?.fullName || "Unknown"} – {r.message} ("{new Date(r.reportedAt).toLocaleString()}")
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-[#E65100] mb-2">Reports Made</h3>
                {reports.reportsMade.length === 0 ? (
                  <p className="text-sm text-[#E65100]/70">No reports made.</p>
                ) : (
                  <ul className="list-disc ml-6 space-y-1">
                    {reports.reportsMade.map((r) => (
                      <li key={r._id} className="text-sm">
                        Against: {r.candidateId?.fullName || "Unknown"} – {r.message} ("{new Date(r.reportedAt).toLocaleString()}")
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
