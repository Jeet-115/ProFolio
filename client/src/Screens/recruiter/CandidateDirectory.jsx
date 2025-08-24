import { useState, useEffect } from "react";
import {
  getCandidates,
  bookmarkCandidate,
} from "../../services/candidateDirectoryService";

export default function CandidateDirectory() {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    experienceLevel: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch candidates on mount and whenever filters change
  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await getCandidates(filters);
      // backend response is { candidates, total, page, totalPages }
      setCandidates(res.data.candidates);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (id) => {
    await bookmarkCandidate(id);
    alert("Candidate bookmarked!");
  };

  const handleContact = (candidate) => {
    const subject = `Interested in your profile - ${candidate.fullName}`;
    const body = `Hi ${candidate.fullName},%0D%0A%0D%0A
I came across your profile on ProFolio and was impressed with your skills in ${
      candidate.skills?.join(", ") || "your listed skills"
    }.%0D%0A
We would like to discuss an opportunity with you.%0D%0A%0D%0A
Looking forward to your response.%0D%0A
Best regards,%0D%0A
[Your Name / Recruiter]%0D%0A
[Company Name]`;

    window.location.href = `mailto:${
      candidate.email
    }?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Candidate Directory</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Figma...)"
          value={filters.skills}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <select
          name="experienceLevel"
          value={filters.experienceLevel}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1–3 years</option>
          <option value="3-5 years">3–5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={filters.education}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
      </div>

      {/* Candidates */}
      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.length > 0 ? (
            candidates.map((c) => (
              <div
                key={c._id}
                className="border p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={c.profilePicture || "/default-avatar.png"}
                  alt={c.fullName}
                  className="w-20 h-20 rounded-full mb-2"
                />
                <h3 className="font-bold">{c.fullName}</h3>
                <p className="text-sm text-gray-600">{c.headline}</p>
                <p className="text-xs text-gray-500">
                  {c.experienceLevel} • {c.location}
                </p>
                <p className="text-xs mt-1">
                  Skills: {c.skills?.join(", ") || "N/A"}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleBookmark(c._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Bookmark
                  </button>
                  <button
                    onClick={() => handleContact(c)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No candidates found.</p>
          )}
        </div>
      )}
    </div>
  );
}
