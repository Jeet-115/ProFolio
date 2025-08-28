import { useEffect, useState } from "react";
import {
  getAllRecruiters,
  getRecruiterById,
  getRecruiterReportsMade,
  getRecruiterBookmarks,
  getRecruiterContacted,
} from "../../services/recruiterService";

export default function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [reports, setReports] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [contacted, setContacted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const res = await getAllRecruiters();
      setRecruiters(res.data || []);
    } catch (err) {
      console.error("Error fetching recruiters:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const res = await getRecruiterById(id);
      setSelectedRecruiter(res.data);

      // fetch recruiter related data
      const reportsRes = await getRecruiterReportsMade(id);
      setReports(reportsRes.data.reportsMade || []);

      const bookmarksRes = await getRecruiterBookmarks(id);
      setBookmarks(bookmarksRes.data || []);

      const contactedRes = await getRecruiterContacted(id);
      setContacted(contactedRes.data || []);

      setActiveTab("details");
    } catch (err) {
      console.error("Error fetching recruiter details:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold luxury-gold-text luxury-heading">Recruiter Management</h1>

      {/* Recruiters List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="w-full h-32 rounded-2xl border border-[#F9A825]/20 bg-gradient-to-br from-white to-[#FFFEF7] data-loading" />
        ) : recruiters.length === 0 ? (
          <p className="text-[#E65100]/70">No recruiters found.</p>
        ) : (
          recruiters.map((rec) => (
            <div
              key={rec._id}
              className="p-4 shadow-xl border border-[#F9A825]/30 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gradient-to-br from-white to-[#FFFEF7] luxury-card"
            >
              <div>
                <h2 className="font-semibold text-[#E65100]">
                  {rec.fullName || "Unnamed Recruiter"}
                </h2>
                <p className="text-sm text-[#E65100]/70 break-all">{rec.email}</p>
                <p className="text-sm text-[#E65100]/90">
                  {rec.companyDetails?.companyName || "No company"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(rec._id)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white hover:from-[#F57F17] hover:to-[#E65100] text-sm shadow luxury-btn luxury-focus"
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recruiter Details with Tabs */}
      {selectedRecruiter && (
        <div className="mt-8 p-4 sm:p-6 border border-[#F9A825]/30 rounded-2xl bg-gradient-to-br from-white to-[#FFFEF7] shadow-2xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-[#F9A825]/30 mb-4">
            {["details", "reports", "bookmarks", "contacted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-3 text-sm font-medium transition-colors luxury-focus ${
                  activeTab === tab
                    ? "border-b-2 border-[#F9A825] text-[#E65100]"
                    : "text-[#E65100]/60 hover:text-[#E65100]"
                }`}
              >
                {tab === "details"
                  ? "Details"
                  : tab === "reports"
                  ? "Reports Made"
                  : tab === "bookmarks"
                  ? "Bookmarked Candidates"
                  : "Contacted Candidates"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "details" && (
            <div>
              <h2 className="text-xl font-bold mb-2 luxury-gold-text luxury-heading">
                {selectedRecruiter.fullName}
              </h2>
              <p className="text-[#E65100] break-all">Email: {selectedRecruiter.email}</p>
              <p className="text-[#E65100]">
                Company: {selectedRecruiter.companyDetails?.companyName || "N/A"}
              </p>
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <h3 className="font-semibold mb-2 text-[#E65100]">Reports Made</h3>
              {reports.length === 0 ? (
                <p className="text-[#E65100]/70">No reports made by this recruiter.</p>
              ) : (
                <ul className="space-y-2">
                  {reports.map((rep) => (
                    <li
                      key={rep._id}
                      className="p-3 border border-[#F9A825]/20 rounded-lg shadow-sm bg-[#FFFDE7]"
                    >
                      <p className="text-sm">
                        Candidate: {rep.candidateId?.fullName || "Unknown"} (
                        {rep.candidateId?.email || "No email"})
                      </p>
                      <p className="text-sm">Message: {rep.message}</p>
                      <p className="text-xs text-[#E65100]/70">
                        Reported At: {new Date(rep.reportedAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div>
              <h3 className="font-semibold mb-2 text-[#E65100]">Bookmarked Candidates</h3>
              {bookmarks.length === 0 ? (
                <p className="text-[#E65100]/70">No bookmarks by this recruiter.</p>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.map((bm) => (
                    <li
                      key={bm._id}
                      className="p-3 border border-[#F9A825]/20 rounded-lg shadow-sm bg-[#FFFDE7]"
                    >
                      <p className="text-sm font-medium">
                        {bm.candidateId?.fullName || "Unknown"} (
                        {bm.candidateId?.email || "No email"})
                      </p>
                      <p className="text-xs text-[#E65100]/70">
                        Bookmarked At: {new Date(bm.bookmarkedAt).toLocaleString()}
                      </p>
                      {bm.notes && <p className="text-sm">Notes: {bm.notes}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "contacted" && (
            <div>
              <h3 className="font-semibold mb-2 text-[#E65100]">Contacted Candidates</h3>
              {contacted.length === 0 ? (
                <p className="text-[#E65100]/70">No candidates contacted by this recruiter.</p>
              ) : (
                <ul className="space-y-2">
                  {contacted.map((ct) => (
                    <li
                      key={ct._id}
                      className="p-3 border border-[#F9A825]/20 rounded-lg shadow-sm bg-[#FFFDE7]"
                    >
                      <p className="text-sm font-medium">
                        {ct.candidateId?.fullName || "Unknown"} (
                        {ct.candidateId?.email || "No email"})
                      </p>
                      <p className="text-xs text-[#E65100]/70">
                        Contacted At: {new Date(ct.contactedAt).toLocaleString()}
                      </p>
                      <p className="text-sm">Method: {ct.method}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
