import { useEffect, useState } from "react";
import { getUserAnalytics } from "../../services/analyticsService";
import {
  LineChart, Line, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
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

  if (loading) return <p className="text-center mt-10">Loading analytics...</p>;
  if (!analytics) return <p className="text-center mt-10 text-red-500">Failed to load analytics</p>;

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="p-3 md:p-6 space-y-6 md:space-y-8">
      <h1 className="text-2xl font-bold">📊 User Analytics</h1>

      {/* Row 1 - Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Resumes</p>
          <h2 className="text-xl font-bold">{analytics.overview.totalResumes}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Portfolios</p>
          <h2 className="text-xl font-bold">{analytics.overview.totalPortfolios}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Downloads</p>
          <h2 className="text-xl font-bold">{analytics.overview.totalDownloads}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Views</p>
          <h2 className="text-xl font-bold">{analytics.overview.totalViews}</h2>
        </div>
      </div>

      {/* Row 2 - Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">
        <div className="bg-white shadow rounded-2xl p-2 sm:p-4">
          <h2 className="font-semibold mb-2">Resume Downloads Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.resumes.trend}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="downloads" stroke="#4f46e5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow rounded-2xl p-2 sm:p-4">
          <h2 className="font-semibold mb-2">Portfolio Views Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.portfolios.trend}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 - Distribution & Comparative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">
        <div className="bg-white shadow rounded-2xl p-2 sm:p-4 -mx-3 md:mx-0">
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
                labelLine={false}
                outerRadius={110}
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={index} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-2xl p-2 sm:p-4 text-black">
          <h2 className="font-semibold mb-2">Resumes vs Portfolios Activity</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={[
                { name: "Resumes", downloads: analytics.comparative.activity.downloads },
                { name: "Portfolios", views: analytics.comparative.activity.views },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="downloads" fill="#4f46e5" />
              <Bar dataKey="views" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4 - Recent Activity */}
      <div className="bg-white shadow rounded-2xl p-4 text-black">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-black">
          {analytics.recentActivity.map((act, idx) => (
            <li key={idx} className="border-b pb-2">
              <span className="font-semibold capitalize">{act.type}</span> – {act.action} <b>{act.name}</b>
              <span className="text-gray-500 text-sm"> ({new Date(act.date).toLocaleDateString()})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
