import { useEffect, useState } from "react";
import {
  getRecruiterProfile,
  getRecruiterStats,
  getRecentCandidates,
  getSuggestedCandidates,
} from "../../services/recruiterHomeService";

export default function RecruiterDashboardHome() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [suggestedCandidates, setSuggestedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, statsRes, recentRes, suggestedRes] =
          await Promise.all([
            getRecruiterProfile(),
            getRecruiterStats(),
            getRecentCandidates(),
            getSuggestedCandidates(),
          ]);

        setProfile(profileRes.data);
        setStats(statsRes.data);
        setRecentCandidates(recentRes.data);
        setSuggestedCandidates(suggestedRes.data);
      } catch (err) {
        console.error("Error fetching recruiter dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      {profile && (
        <div className="flex items-center gap-4 bg-white shadow rounded-2xl p-4">
          <img
            src={profile.profilePicture || "/default-avatar.png"}
            alt="Recruiter"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              Welcome back, {profile.fullName}
            </h2>
            <p className="text-gray-500">
              {profile.company || "Your Company"}
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl shadow text-center">
            <h3 className="text-lg font-bold">{stats.viewedCount}</h3>
            <p className="text-gray-500">Candidates Viewed</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl shadow text-center">
            <h3 className="text-lg font-bold">{stats.bookmarkedCount}</h3>
            <p className="text-gray-500">Bookmarked</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow text-center">
            <h3 className="text-lg font-bold">{stats.contactedCount}</h3>
            <p className="text-gray-500">Contacted</p>
          </div>
        </div>
      )}

      {/* Recently Viewed Candidates */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recently Viewed Candidates</h3>
        {recentCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCandidates.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-3"
              >
                <img
                  src={
                    item.candidateId?.profilePicture || "/default-avatar.png"
                  }
                  alt="Candidate"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {item.candidateId?.fullName || "Unnamed Candidate"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.candidateId?.bio || "No bio available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No candidates viewed yet.</p>
        )}
      </div>

      {/* Suggested Candidates */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Suggested Candidates</h3>
        {suggestedCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedCandidates.map((candidate, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-3"
              >
                <img
                  src={candidate.profilePicture || "/default-avatar.png"}
                  alt="Candidate"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {candidate.fullName || "Unnamed Candidate"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {candidate.bio || "No bio available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No suggestions yet.</p>
        )}
      </div>
    </div>
  );
}
