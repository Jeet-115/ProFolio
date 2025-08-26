import { useState, useEffect } from "react";
import {
  getCandidates,
  bookmarkCandidate,
} from "../../services/candidateDirectoryService";
import { getBookmarks } from "../../services/bookmarkService";
import BookmarkToggle from "../../Components/Recruiter/BookmarkToggle";
import ContactButton from "../../Components/Recruiter/ContactButton";
import ViewProfileButton from "../../Components/Recruiter/ViewProfileButton";
import ThemedInput from "../../Components/Common/ThemedInput";
import FancySelect from "../../Components/Common/FancySelect";

export default function CandidateDirectory() {
  const [candidates, setCandidates] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    experienceLevel: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);

  // Preload existing bookmarks on mount so toggles reflect saved state
  useEffect(() => {
    const preload = async () => {
      try {
        const { data } = await getBookmarks();
        const ids = new Set(
          (data || []).map((b) => (b.candidateId?._id ?? b.candidateId)).filter(Boolean)
        );
        setBookmarkedIds(ids);
      } catch (e) {
        console.error("Failed to preload bookmarks", e);
      }
    };
    preload();
  }, []);

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
    try {
      await bookmarkCandidate(id);
      setBookmarkedIds((prev) => new Set(prev).add(id));
    } catch (e) {
      console.error("Bookmark failed", e);
    }
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
      <h2 className="text-2xl font-semibold mb-4 text-white">Candidate Directory</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8 mb-10">
        <ThemedInput
          label="Skills (React, Figma...)"
          name="skills"
          value={filters.skills}
          onChange={handleFilterChange}
        />
        <ThemedInput
          label="Location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <FancySelect
          name="experienceLevel"
          value={filters.experienceLevel}
          onChange={handleFilterChange}
          placeholder="Experience"
          options={[
            { value: "", label: "Any", subtitle: "All experience levels" },
            { value: "Fresher", label: "Fresher", subtitle: "0 years" },
            { value: "1-3 years", label: "1–3 years", subtitle: "Junior" },
            { value: "3-5 years", label: "3–5 years", subtitle: "Mid-level" },
            { value: "5+ years", label: "5+ years", subtitle: "Senior" },
          ]}
        />
        <ThemedInput
          label="Education"
          name="education"
          value={filters.education}
          onChange={handleFilterChange}
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
                className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20 p-5 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-xl hover:bg-white/15"
              >
                <img
                  src={c.profilePicture || "/default-avatar.png"}
                  alt={c.fullName}
                  className="w-20 h-20 rounded-full mb-3 ring-2 ring-amber-500/60 shadow-md object-cover"
                />
                <h3 className="font-semibold text-white">{c.fullName}</h3>
                <p className="text-sm text-gray-300 text-center">{c.headline}</p>
                <p className="text-xs text-gray-400">
                  {c.experienceLevel} • {c.location}
                </p>
                <p className="text-xs mt-1 text-gray-200">
                  Skills: {c.skills?.join(", ") || "N/A"}
                </p>

                {/* Actions */}
                <div className="flex gap-3 mt-3 flex-wrap items-center justify-center">
                  <BookmarkToggle
                    checked={bookmarkedIds.has(c._id)}
                    onCheck={() => handleBookmark(c._id)}
                  />
                  <ContactButton onClick={() => handleContact(c)} />
                  <ViewProfileButton
                    onClick={() =>
                      (window.location.href = `/recruiter/dashboard/candidates/${c._id}`)
                    }
                  />
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
