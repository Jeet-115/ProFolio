import { useEffect, useState } from "react";
import {
  getReportsMade,
  getContactedCandidates,
} from "../../services/recruiterActivityService";

export default function RecruiterActivity() {
  const [reports, setReports] = useState([]);
  const [contacted, setContacted] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Reports Made Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reports Made</h2>
        {reports.length > 0 ? (
          <ul className="space-y-4">
            {reports.map((report) => (
              <li
                key={report._id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <p className="font-semibold">
                  Candidate: {report.candidateId?.fullName || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">{report.message}</p>
                <p className="text-xs text-gray-400">
                  Reported on {new Date(report.reportedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports made yet.</p>
        )}
      </section>

      {/* Contacted Candidates Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Contacted Candidates</h2>
        {contacted.length > 0 ? (
          <ul className="space-y-4">
            {contacted.map((contact) => (
              <li
                key={contact._id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <p className="font-semibold">
                  Candidate: {contact.candidateId?.fullName || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">
                  Contact Method: {contact.method}
                </p>
                <p className="text-xs text-gray-400">
                  Contacted on{" "}
                  {new Date(contact.contactedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No candidates contacted yet.</p>
        )}
      </section>
    </div>
  );
}
