import { useEffect, useState } from "react";
import {
  getUserAnalytics,
  getRecruiterAnalytics,
  getAdminAnalytics,
} from "../../services/adminAnalyticsService";

export default function AdminAnalytics() {
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [recruiterAnalytics, setRecruiterAnalytics] = useState(null);
  const [adminAnalytics, setAdminAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, recruiterRes, adminRes] = await Promise.all([
          getUserAnalytics(),
          getRecruiterAnalytics(),
          getAdminAnalytics(),
        ]);

        setUserAnalytics(userRes.data);
        setRecruiterAnalytics(recruiterRes.data);
        setAdminAnalytics(adminRes.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading analytics...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-8">
      {/* ----- USER ANALYTICS ----- */}
      <section className="bg-white   shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">User Analytics</h2>
        <ul className="space-y-2">
          <li>Total Resumes: {userAnalytics.totalResumes}</li>
          <li>Resumes (Builder): {userAnalytics.resumes}</li>
          <li>Resumes (Template): {userAnalytics.templateResumes}</li>
          <li>Last Resume Updated: {userAnalytics.lastResumeUpdated || "N/A"}</li>
          <li>Total Portfolios: {userAnalytics.totalPortfolios}</li>
          <li>Portfolios (Builder): {userAnalytics.portfolios}</li>
          <li>Portfolios (Template): {userAnalytics.templatePortfolios}</li>
          <li>Last Portfolio Updated: {userAnalytics.lastPortfolioUpdated || "N/A"}</li>
          <li>Skills Count: {userAnalytics.skillsCount}</li>
          <li>Experience Level: {userAnalytics.experienceLevel || "Not set"}</li>
          <li>Recruiter Consent: {userAnalytics.recruiterConsent ? "Enabled" : "Disabled"}</li>
          <li>Reports Received: {userAnalytics.reportsReceived}</li>
        </ul>
      </section>

      {/* ----- RECRUITER ANALYTICS ----- */}
      <section className="bg-white   shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recruiter Analytics</h2>
        <ul className="space-y-2">
          <li>Viewed Candidates: {recruiterAnalytics.viewedCandidates}</li>
          <li>Bookmarked Candidates: {recruiterAnalytics.bookmarkedCandidates}</li>
          <li>Total Contacts: {recruiterAnalytics.contactedCandidates}</li>
          <li>Contacts by Email: {recruiterAnalytics.contactedByMethod?.email}</li>
          <li>Contacts by Message: {recruiterAnalytics.contactedByMethod?.message}</li>
          <li>Reports Made: {recruiterAnalytics.reportsMade}</li>
          <li>Job Roles Listed: {recruiterAnalytics.jobRoles}</li>
        </ul>
      </section>

      {/* ----- ADMIN ANALYTICS ----- */}
      <section className="bg-white   shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Analytics</h2>

        <h3 className="text-lg font-medium mt-2">Users Breakdown</h3>
        <ul className="space-y-2">
          <li>Total Users: {adminAnalytics.users.total}</li>
          <li>Normal Users: {adminAnalytics.users.userCount}</li>
          <li>Recruiters: {adminAnalytics.users.recruiterCount}</li>
          <li>Admins: {adminAnalytics.users.adminCount}</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Content Creation</h3>
        <ul className="space-y-2">
          <li>Resumes: {adminAnalytics.content.resumes}</li>
          <li>Template Resumes: {adminAnalytics.content.templateResumes}</li>
          <li>Portfolios: {adminAnalytics.content.portfolios}</li>
          <li>Template Portfolios: {adminAnalytics.content.templatePortfolios}</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Recruiter Activity</h3>
        <ul className="space-y-2">
          <li>Total Candidate Views: {adminAnalytics.recruiterActivity.totalViews}</li>
          <li>Total Bookmarks: {adminAnalytics.recruiterActivity.totalBookmarks}</li>
          <li>Total Contacts: {adminAnalytics.recruiterActivity.totalContacts}</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Reports</h3>
        <ul className="space-y-2">
          <li>Reports Received: {adminAnalytics.reports.totalReportsReceived}</li>
          <li>Reports Made: {adminAnalytics.reports.totalReportsMade}</li>
        </ul>
      </section>
    </div>
  );
}
