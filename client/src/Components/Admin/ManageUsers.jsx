import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";

function RoleBadge({ role }) {
  const base = "px-2 py-0.5 rounded text-xs font-semibold";
  if (role === "admin")
    return <span className={`${base} bg-amber-100 text-amber-800`}>admin</span>;
  return (
    <span className={`${base} bg-emerald-100 text-emerald-800`}>user</span>
  );
}

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/admin/users");
      setUsers(data);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await axios.put(`/admin/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to update role");
    }
  };

  const removeUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to delete user");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#2E3C43]">Manage Users</h2>
        <button
          onClick={fetchUsers}
          className="px-3 py-1.5 rounded bg-[#00ACC1] text-white hover:bg-[#0097A7]"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Username</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="py-2 pr-4">{u.username}</td>
                <td className="py-2 pr-4">{u.email}</td>
                <td className="py-2 pr-4">
                  <RoleBadge role={u.role} />
                </td>
                <td className="py-2 pr-4 flex gap-2">
                  <button
                    onClick={() =>
                      changeRole(u._id, u.role === "admin" ? "user" : "admin")
                    }
                    className="px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Make {u.role === "admin" ? "User" : "Admin"}
                  </button>
                  <button
                    onClick={() => removeUser(u._id)}
                    className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
