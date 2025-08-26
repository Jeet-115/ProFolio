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
