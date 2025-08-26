import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import {
  getReportsMade,
  getContactedCandidates,
} from "../../services/recruiterActivityService";

export default function RecruiterActivity() {
  const [reports, setReports] = useState([]);
  const [contacted, setContacted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("reports"); // 'reports' | 'contacted'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsRes, contactedRes] = await Promise.all([
          getReportsMade(),
          getContactedCandidates(),
        ]);
        setReports(reportsRes.data);
        setContacted(contactedRes.data);
      } catch (error) {
        console.error("Error fetching recruiter activity:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center p-6 text-white">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Tabs */}
      <div className="bg-white/10 border border-white/15 rounded-xl p-1 backdrop-blur-md w-full max-w-xl">
        <div role="tablist" aria-label="Recruiter activity tabs" className="grid grid-cols-2 gap-1">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
              activeTab === "reports"
                ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            Reports Made
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/15">{reports?.length || 0}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "contacted"}
            onClick={() => setActiveTab("contacted")}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
              activeTab === "contacted"
                ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            Contacted Candidates
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/15">{contacted?.length || 0}</span>
          </button>
        </div>
      </div>

      {/* Panels */}
      {activeTab === "reports" ? (
        <section role="tabpanel">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Reports Made</h2>
          {reports.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => {
                const c = report.candidateId || {};
                return (
                  <li
                    key={report._id}
                    className="p-4 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={c.profilePicture || "/default-avatar.png"}
                        alt={c.fullName || "Candidate"}
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate flex items-center gap-2">
                              <FaUser className="text-white/80" /> {c.fullName || "Unknown"}
                            </p>
                            <p className="text-xs text-white/70 truncate">
                              {c.headline || c.position || "Candidate"}
                            </p>
                          </div>
                          <div className="text-xs text-white/60 flex items-center gap-1">
                            <FaCalendarAlt />
                            <span>Reported {new Date(report.reportedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-300 break-words mt-2">
                          {report.message}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                          {c.email && (
                            <span className="inline-flex items-center gap-1">
                              <FaEnvelope className="opacity-80" />
                              <span className="break-all">{c.email}</span>
                            </span>
                          )}
                          {c.location && <span className="hidden sm:inline">• {c.location}</span>}
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => c._id && navigate(`/recruiter/dashboard/candidates/${c._id}`)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm transition-colors"
                          >
                            <FaExternalLinkAlt className="text-amber-300" /> View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-300">No reports made yet.</p>
          )}
        </section>
      ) : (
        <section role="tabpanel">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Contacted Candidates</h2>
          {contacted.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacted.map((contact) => {
                const c = contact.candidateId || {};
                return (
                  <li
                    key={contact._id}
                    className="p-4 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={c.profilePicture || "/default-avatar.png"}
                        alt={c.fullName || "Candidate"}
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate flex items-center gap-2">
                              <FaUser className="text-white/80" /> {c.fullName || "Unknown"}
                            </p>
                            <p className="text-xs text-white/70 truncate">
                              {c.headline || c.position || "Candidate"}
                            </p>
                          </div>
                          <div className="text-xs text-white/60 flex items-center gap-1">
                            <FaCalendarAlt />
                            <span>Contacted {new Date(contact.contactedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-300 mt-2">
                          Contact Method: <span className="text-white/90">{contact.method}</span>
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                          {c.email && (
                            <span className="inline-flex items-center gap-1">
                              <FaEnvelope className="opacity-80" />
                              <span className="break-all">{c.email}</span>
                            </span>
                          )}
                          {c.location && <span className="hidden sm:inline">• {c.location}</span>}
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => c._id && navigate(`/recruiter/dashboard/candidates/${c._id}`)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm transition-colors"
                          >
                            <FaExternalLinkAlt className="text-amber-300" /> View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-300">No candidates contacted yet.</p>
          )}
        </section>
      )}
    </div>
  );
}
