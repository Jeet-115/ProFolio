import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemedInput from "../../Components/Common/ThemedInput";
import { getCandidateProfile, reportCandidate } from "../../services/candidateProfileService";
import { Mail, Flag, Github, Linkedin, Globe, MapPin, ArrowLeft } from "lucide-react";

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

  if (loading) return <div className="p-6 text-white/90">Loading candidate profile...</div>;
  if (!profile) return <div className="p-6 text-white/90">Candidate not found</div>;

  const { candidate, resumes, templateResumes, portfolios, templatePortfolios } = profile;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Header card */}
      <div className="p-5 sm:p-6 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20 flex items-center gap-5">
        <img
          src={candidate.profilePicture || "/default-avatar.png"}
          alt={candidate.fullName}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-white/20"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{candidate.fullName}</h1>
          {candidate.headline && (
            <p className="text-white/80 text-sm sm:text-base truncate">{candidate.headline}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
            {candidate.location && (
              <span className="inline-flex items-center gap-1 text-white/70">
                <MapPin className="w-4 h-4" /> {candidate.location}
              </span>
            )}
            <div className="flex items-center gap-3">
              {candidate.socialLinks?.github && (
                <a
                  className="text-white/80 hover:text-white"
                  href={candidate.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {candidate.socialLinks?.linkedin && (
                <a
                  className="text-white/80 hover:text-white"
                  href={candidate.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {candidate.socialLinks?.website && (
                <a
                  className="text-white/80 hover:text-white"
                  href={candidate.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {candidate.bio && (
        <div className="p-5 rounded-2xl border border-white/15 bg-white/5 text-white/90">
          <h2 className="font-semibold mb-2 text-white">About</h2>
          <p className="text-white/80 leading-relaxed">{candidate.bio}</p>
        </div>
      )}

      {/* Skills */}
      {candidate.skills?.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2 text-white">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm bg-amber-500/15 text-amber-300 border border-amber-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resumes */}
      <div>
        <h2 className="font-semibold mb-3 text-white">Resumes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resumes.map((r) => (
            <li
              key={r._id}
              className="p-4 rounded-xl border border-white/15 bg-white/5 text-white/90"
            >
              <div className="font-medium">{r.name}</div>
            </li>
          ))}
          {templateResumes.map((r) => (
            <li
              key={r._id}
              className="p-4 rounded-xl border border-white/15 bg-white/5 text-white/90"
            >
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-white/70 mt-1">Template: {r.templateName}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Portfolios */}
      <div>
        <h2 className="font-semibold mb-3 text-white">Portfolios</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {portfolios.map((p) => (
            <li
              key={p._id}
              className="p-4 rounded-xl border border-white/15 bg-white/5 text-white/90"
            >
              <div className="font-medium">{p.name}</div>
            </li>
          ))}
          {templatePortfolios.map((p) => (
            <li
              key={p._id}
              className="p-4 rounded-xl border border-white/15 bg-white/5 text-white/90"
            >
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-white/70 mt-1">Template: {p.templateName}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3 sm:items-center">
        {/* Contact button (gradient style) */}
        <div className="order-2 sm:order-none bg-gradient-to-b from-stone-300/40 to-transparent p-[2px] rounded-[10px] w-auto">
          <button
            onClick={handleContact}
            className="group p-[2px] rounded-[8px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.45)] active:shadow-[0_0px_1px_rgba(0,0,0,0.45)] active:scale-[0.997] w-auto focus-visible:outline-none"
          >
            <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[6px] h-[36px] w-auto sm:w-[110px] px-3 py-1 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white/50">
              <div className="flex gap-1.5 items-center text-stone-900">
                <Mail className="w-[14px] h-[14px] sm:w-[12px] sm:h-[12px]" />
                <span className="font-semibold text-[14px] sm:text-[12px] leading-none">Contact</span>
              </div>
            </div>
          </button>
        </div>

        {/* Report reason + gradient report button */}
        <div className="order-1 sm:order-none col-span-2 flex items-center gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none min-w-[160px]">
            {/* Hidden dummy input to steer browser autofill away from the reason field */}
            <input type="text" name="username" autoComplete="username" className="hidden" aria-hidden="true" tabIndex={-1} />
            <ThemedInput
              label="Reason to report"
              name="reportReasonInput"
              type="text"
              compact
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              maxLength={300}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              inputMode="text"
            />
            <div className="mt-1 text-[10px] text-white/60 text-right">{reportReason.length}/300</div>
          </div>

          <div className={`order-2 sm:order-none bg-gradient-to-b from-stone-300/40 to-transparent p-[2px] rounded-[10px] w-auto ${reporting ? 'opacity-60 cursor-not-allowed' : ''}`}>
            <button
              onClick={handleReport}
              disabled={reporting}
              className="group p-[2px] rounded-[8px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.45)] active:shadow-[0_0px_1px_rgba(0,0,0,0.45)] active:scale-[0.997] w-auto"
            >
              <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[6px] h-[36px] w-auto sm:w-[110px] px-3 py-1 flex items-center justify-center">
                <div className="flex gap-1.5 items-center text-stone-900">
                  <Flag className="w-[14px] h-[14px] sm:w-[12px] sm:h-[12px]" />
                  <span className="font-semibold text-[14px] sm:text-[12px] leading-none">Report</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
