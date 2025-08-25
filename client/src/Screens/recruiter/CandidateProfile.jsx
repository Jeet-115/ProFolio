import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCandidateProfile, reportCandidate } from "../../services/candidateProfileService";
import { Mail, Flag, Github, Linkedin, Globe } from "lucide-react";

// ✅ Simple reusable Button component
function Button({ children, onClick, disabled, variant = "default" }) {
  const baseClasses =
    "flex items-center px-4 py-2 rounded-lg font-medium shadow-sm transition text-sm";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reporting, setReporting] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getCandidateProfile(id);
        setProfile(data);
      } catch (err) {
        console.error("Failed to load candidate profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleContact = () => {
    if (!profile?.candidate?.email) {
      alert("Candidate email not available.");
      return;
    }

    const subject = `Opportunity for ${profile.candidate.fullName}`;
    const body = `Hi ${profile.candidate.fullName},%0D%0A%0D%0AI came across your profile on ProFolio and I’m interested in connecting with you regarding potential opportunities.%0D%0A%0D%0ARegards,%0D%0A[Recruiter Name]`;
    window.location.href = `mailto:${profile.candidate.email}?subject=${subject}&body=${body}`;
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      alert("Please enter a reason to report this candidate.");
      return;
    }
    setReporting(true);
    try {
      await reportCandidate(id, reportReason);
      alert("Candidate reported successfully.");
      setReportReason("");
    } catch (err) {
      console.error("Report failed", err);
      alert("Failed to report candidate.");
    } finally {
      setReporting(false);
    }
  };

  if (loading) return <div className="p-6">Loading candidate profile...</div>;
  if (!profile) return <div className="p-6">Candidate not found</div>;

  const { candidate, resumes, templateResumes, portfolios, templatePortfolios } = profile;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={candidate.profilePicture || "/default-avatar.png"}
          alt={candidate.fullName}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{candidate.fullName}</h1>
          <p className="text-gray-600">{candidate.headline}</p>
          <p className="text-gray-500 text-sm">{candidate.location}</p>
          <div className="flex gap-2 mt-2">
            {candidate.socialLinks?.github && (
              <a href={candidate.socialLinks.github} target="_blank" rel="noreferrer">
                <Github className="w-5 h-5" />
              </a>
            )}
            {candidate.socialLinks?.linkedin && (
              <a href={candidate.socialLinks.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {candidate.socialLinks?.website && (
              <a href={candidate.socialLinks.website} target="_blank" rel="noreferrer">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {candidate.bio && (
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-2">About</h2>
          <p className="text-gray-700">{candidate.bio}</p>
        </div>
      )}

      {/* Skills */}
      {candidate.skills?.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resumes */}
      <div>
        <h2 className="font-semibold mb-2">Resumes</h2>
        <ul className="list-disc list-inside text-gray-700">
          {resumes.map((r) => (
            <li key={r._id}>{r.name}</li>
          ))}
          {templateResumes.map((r) => (
            <li key={r._id}>{r.name} (Template: {r.templateName})</li>
          ))}
        </ul>
      </div>

      {/* Portfolios */}
      <div>
        <h2 className="font-semibold mb-2">Portfolios</h2>
        <ul className="list-disc list-inside text-gray-700">
          {portfolios.map((p) => (
            <li key={p._id}>{p.name}</li>
          ))}
          {templatePortfolios.map((p) => (
            <li key={p._id}>{p.name} (Template: {p.templateName})</li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleContact}>
          <Mail className="w-4 h-4 mr-2" /> Contact
        </Button>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Reason to report"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <Button variant="destructive" onClick={handleReport} disabled={reporting}>
            <Flag className="w-4 h-4 mr-2" /> Report
          </Button>
        </div>
      </div>
    </div>
  );
}
