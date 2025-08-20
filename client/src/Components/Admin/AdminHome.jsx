import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";

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
    <div className="text-2xl font-semibold text-[#2E3C43]" aria-live="polite">
      {count == null ? "—" : count}
    </div>
  );
}

const AdminHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#2E3C43]">
        Welcome, Admin!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] rounded-xl p-4 shadow">
          <div className="text-sm text-[#2E3C43]/70">Total Users</div>
          <AdminUsersCount />
        </div>
        <div className="bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] rounded-xl p-4 shadow">
          <div className="text-sm text-[#2E3C43]/70">Files Stored</div>
          <div className="text-2xl font-semibold text-[#2E3C43]">—</div>
        </div>
        <div className="bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] rounded-xl p-4 shadow">
          <div className="text-sm text-[#2E3C43]/70">Active Sessions</div>
          <div className="text-2xl font-semibold text-[#2E3C43]">—</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E0F2F1] p-5">
          <h2 className="text-lg font-semibold mb-3 text-[#2E3C43]">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/users"
              className="px-4 py-2 rounded bg-[#00ACC1] text-white hover:bg-[#0097A7] transition"
            >
              Manage Users
            </a>
            <a
              href="/admin/files"
              className="px-4 py-2 rounded bg-[#00ACC1] text-white hover:bg-[#0097A7] transition"
            >
              Manage Files
            </a>
            <a
              href="/admin/settings"
              className="px-4 py-2 rounded bg-[#00ACC1] text-white hover:bg-[#0097A7] transition"
            >
              Settings
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0F2F1] p-5">
          <h2 className="text-lg font-semibold mb-3 text-[#2E3C43]">
            System Status
          </h2>
          <ul className="text-sm text-[#2E3C43]/80 space-y-2">
            <li>API: Online</li>
            <li>Database: Connected</li>
            <li>Storage: Healthy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
