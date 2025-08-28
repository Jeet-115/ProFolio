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
    <div className="text-3xl font-bold luxury-gold-text" aria-live="polite">
      {count == null ? "—" : count}
    </div>
  );
}

const AdminHome = () => {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 luxury-gold-text luxury-heading">
        Welcome, Admin!
      </h1>

      <div className="luxury-grid mb-8">
        <div className="bg-gradient-to-br from-white to-[#FFFEF7] rounded-2xl p-6 shadow-2xl border border-[#F9A825]/20 hover:border-[#F9A825]/40 transition-all duration-300 hover:shadow-[#F9A825]/10 hover:shadow-2xl luxury-card glow-border">
          <div className="text-sm text-[#E65100]/70 mb-2 font-medium luxury-subheading">Total Users</div>
          <AdminUsersCount />
          <div className="mt-2 text-xs text-[#E65100]/50">Active registered users</div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#FFFEF7] rounded-2xl p-6 shadow-2xl border border-[#F9A825]/20 hover:border-[#F9A825]/40 transition-all duration-300 hover:shadow-[#F9A825]/10 hover:shadow-2xl luxury-card glow-border">
          <div className="text-sm text-[#E65100]/70 mb-2 font-medium luxury-subheading">Files Stored</div>
          <div className="text-3xl font-bold luxury-gold-text">—</div>
          <div className="mt-2 text-xs text-[#E65100]/50">Total files in system</div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#FFFEF7] rounded-2xl p-6 shadow-2xl border border-[#F9A825]/20 hover:border-[#F9A825]/40 transition-all duration-300 hover:shadow-[#F9A825]/10 hover:shadow-2xl luxury-card glow-border">
          <div className="text-sm text-[#E65100]/70 mb-2 font-medium luxury-subheading">Active Sessions</div>
          <div className="text-3xl font-bold luxury-gold-text">—</div>
          <div className="mt-2 text-xs text-[#E65100]/50">Current user sessions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="hidden md:block bg-gradient-to-br from-white to-[#FFFEF7] rounded-2xl border border-[#F9A825]/20 p-4 md:p-6 shadow-2xl luxury-card">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 luxury-gold-text border-b border-[#F9A825]/30 pb-3 luxury-heading">
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
            <a
              href="/admin/users"
              className="w-full sm:w-auto text-center px-5 md:px-6 py-3 rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white hover:from-[#F57F17] hover:to-[#E65100] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 border border-[#FFD54F]/30 luxury-btn luxury-focus"
            >
              Manage Users
            </a>
            <a
              href="/admin/recruiters"
              className="w-full sm:w-auto text-center px-5 md:px-6 py-3 rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white hover:from-[#F57F17] hover:to-[#E65100] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 border border-[#FFD54F]/30 luxury-btn luxury-focus"
            >
              Manage Recruiters
            </a>
            <a
              href="/admin/analytics"
              className="w-full sm:w-auto text-center px-5 md:px-6 py-3 rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white hover:from-[#F57F17] hover:to-[#E65100] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 border border-[#FFD54F]/30 luxury-btn luxury-focus"
            >
              Analytics
            </a>
            <a
              href="/admin/settings"
              className="w-full sm:w-auto text-center px-5 md:px-6 py-3 rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white hover:from-[#F57F17] hover:to-[#E65100] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 border border-[#FFD54F]/30 luxury-btn luxury-focus"
            >
              Settings
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#FFFEF7] rounded-2xl border border-[#F9A825]/20 p-4 md:p-6 shadow-2xl luxury-card">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 luxury-gold-text border-b border-[#F9A825]/30 pb-3 luxury-heading">
            System Status
          </h2>
          <ul className="text-sm text-[#E65100]/80 space-y-3 md:space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
              <span className="font-medium luxury-subheading">API: Online</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
              <span className="font-medium luxury-subheading">Database: Connected</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
              <span className="font-medium luxury-subheading">Storage: Healthy</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
