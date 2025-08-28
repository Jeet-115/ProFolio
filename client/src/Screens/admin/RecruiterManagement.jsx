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
      <h1 className="text-2xl font-bold">Recruiter Management</h1>

      {/* Recruiters List */}
      <div className="grid gap-4">
        {loading ? (
          <p>Loading recruiters...</p>
        ) : recruiters.length === 0 ? (
          <p>No recruiters found.</p>
        ) : (
          recruiters.map((rec) => (
            <div
              key={rec._id}
              className="p-4 shadow-md border rounded-lg flex justify-between items-center bg-white"
            >
              <div>
                <h2 className="font-semibold">
                  {rec.fullName || "Unnamed Recruiter"}
                </h2>
                <p className="text-sm text-gray-500">{rec.email}</p>
                <p className="text-sm">
                  {rec.companyDetails?.companyName || "No company"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(rec._id)}
                  className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm"
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
        <div className="mt-8 p-4 border rounded-lg bg-white shadow-md">
          {/* Tabs */}
          <div className="flex gap-4 border-b mb-4">
            {["details", "reports", "bookmarks", "contacted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-3 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
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
              <h2 className="text-xl font-bold mb-2">
                {selectedRecruiter.fullName}
              </h2>
              <p>Email: {selectedRecruiter.email}</p>
              <p>
                Company: {selectedRecruiter.companyDetails?.companyName || "N/A"}
              </p>
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <h3 className="font-semibold mb-2">Reports Made</h3>
              {reports.length === 0 ? (
                <p>No reports made by this recruiter.</p>
              ) : (
                <ul className="space-y-2">
                  {reports.map((rep) => (
                    <li
                      key={rep._id}
                      className="p-3 border rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="text-sm">
                        Candidate: {rep.candidateId?.fullName || "Unknown"} (
                        {rep.candidateId?.email || "No email"})
                      </p>
                      <p className="text-sm">Message: {rep.message}</p>
                      <p className="text-xs text-gray-500">
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
              <h3 className="font-semibold mb-2">Bookmarked Candidates</h3>
              {bookmarks.length === 0 ? (
                <p>No bookmarks by this recruiter.</p>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.map((bm) => (
                    <li
                      key={bm._id}
                      className="p-3 border rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="text-sm font-medium">
                        {bm.candidateId?.fullName || "Unknown"} (
                        {bm.candidateId?.email || "No email"})
                      </p>
                      <p className="text-xs text-gray-500">
                        Bookmarked At:{" "}
                        {new Date(bm.bookmarkedAt).toLocaleString()}
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
              <h3 className="font-semibold mb-2">Contacted Candidates</h3>
              {contacted.length === 0 ? (
                <p>No candidates contacted by this recruiter.</p>
              ) : (
                <ul className="space-y-2">
                  {contacted.map((ct) => (
                    <li
                      key={ct._id}
                      className="p-3 border rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="text-sm font-medium">
                        {ct.candidateId?.fullName || "Unknown"} (
                        {ct.candidateId?.email || "No email"})
                      </p>
                      <p className="text-xs text-gray-500">
                        Contacted At:{" "}
                        {new Date(ct.contactedAt).toLocaleString()}
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
