import { useEffect, useState } from "react";
import { getUserAnalytics } from "../../services/analyticsService";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, CartesianGrid
} from "recharts";

export default function UserAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAnalytics()
      .then(res => setAnalytics(res.data))
      .catch(err => console.error("Analytics fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10 text-white/80">Loading analytics...</p>;
  if (!analytics) return <p className="text-center mt-10 text-red-300">Failed to load analytics</p>;

  const COLORS = ["#4f46e5", "#a78bfa", "#f59e0b", "#ef4444"];

  // Custom tooltip for better readability
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-white/10 rounded-lg shadow px-3 py-2 text-sm text-white">
          {label && <div className="font-semibold mb-1 text-white/90">{label}</div>}
          {payload.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="inline-block w-2.5 h-2.5 rounded"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-white/80">{p.name}: </span>
              <span className="font-semibold text-white">{p.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-3 md:p-6 space-y-6 md:space-y-8 text-white">
      <h1 className="text-2xl font-bold text-white">📊 User Analytics</h1>

      {/* Row 1 - Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow">
          <p className="text-white/70">Total Resumes</p>
          <h2 className="text-xl font-bold text-white">{analytics.overview.totalResumes}</h2>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow">
          <p className="text-white/70">Total Portfolios</p>
          <h2 className="text-xl font-bold text-white">{analytics.overview.totalPortfolios}</h2>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow">
          <p className="text-white/70">Total Downloads</p>
          <h2 className="text-xl font-bold text-white">{analytics.overview.totalDownloads}</h2>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow">
          <p className="text-white/70">Total Views</p>
          <h2 className="text-xl font-bold text-white">{analytics.overview.totalViews}</h2>
        </div>
      </div>

      {/* Row 2 - Trends (Area with gradients) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-4">
          <h2 className="font-semibold mb-2">Resume Downloads Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics.resumes.trend} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="resumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="name" tick={{ fill: "#e5e7eb" }} />
              <YAxis tick={{ fill: "#e5e7eb" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="downloads" stroke="#4f46e5" strokeWidth={2.5} fill="url(#resumeGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-4">
          <h2 className="font-semibold mb-2">Portfolio Views Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics.portfolios.trend} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="name" tick={{ fill: "#e5e7eb" }} />
              <YAxis tick={{ fill: "#e5e7eb" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="views" stroke="#a78bfa" strokeWidth={2.5} fill="url(#portfolioGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 - Distribution & Comparative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-4 -mx-3 md:mx-0">
          <h2 className="font-semibold mb-2">Content Distribution</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={[
                  { name: "Builder Resumes", value: analytics.comparative.distribution.builderResumes },
                  { name: "Template Resumes", value: analytics.comparative.distribution.templateResumes },
                  { name: "Builder Portfolios", value: analytics.comparative.distribution.builderPortfolios },
                  { name: "Template Portfolios", value: analytics.comparative.distribution.templatePortfolios },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={110}
                dataKey="value"
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={index} fill={color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" align="center" wrapperStyle={{ color: '#ffffff' }} formatter={(value) => <span className="text-white">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-4">
          <h2 className="font-semibold mb-2">Resumes vs Portfolios Activity</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={[
                { name: "Resumes", downloads: analytics.comparative.activity.downloads },
                { name: "Portfolios", views: analytics.comparative.activity.views },
              ]}
              barCategoryGap={20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="name" tick={{ fill: "#e5e7eb" }} />
              <YAxis tick={{ fill: "#e5e7eb" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#ffffff' }} formatter={(value) => <span className="text-white">{value === 'downloads' ? 'Downloads' : 'Views'}</span>} />
              <Bar dataKey="downloads" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="views" fill="#a78bfa" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4 - Recent Activity */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {analytics.recentActivity.map((act, idx) => (
            <li key={idx} className="border-b pb-2">
              <span className="font-semibold capitalize">{act.type}</span> – {act.action} <b>{act.name}</b>
              <span className="text-white/70 text-sm"> ({new Date(act.date).toLocaleDateString()})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
