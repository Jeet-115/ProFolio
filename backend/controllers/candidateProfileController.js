// controllers/candidateProfileController.js
import User from "../models/user.js";
import Resume from "../models/resume.js";
import TemplateResume from "../models/templateResume.js";
import Portfolio from "../models/portfolio.js";
import TemplatePortfolio from "../models/templatePortfolio.js";

// 📌 Get Candidate Profile (Read-only)
export const getCandidateProfile = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;

  // ✅ Get candidate user
  const candidate = await User.findById(id).select(
  "fullName headline bio profilePicture socialLinks skills location experienceLevel education role"
);

  if (!candidate || candidate.role !== "user") {
    return res.status(404).json({ error: "Candidate not found" });
  }

  // ✅ Get resumes
  const [resumes, templateResumes] = await Promise.all([
    Resume.find({ user: id }).select("name createdAt updatedAt"),
    TemplateResume.find({ user: id }).select("templateName name createdAt updatedAt"),
  ]);

  // ✅ Get portfolios
  const [portfolios, templatePortfolios] = await Promise.all([
    Portfolio.find({ user: id }).select("name techStack createdAt updatedAt"),
    TemplatePortfolio.find({ user: id }).select("templateName name createdAt updatedAt"),
  ]);

  res.json({
    candidate,
    resumes,
    templateResumes,
    portfolios,
    templatePortfolios,
  });
};


export const reportCandidate = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const { reason } = req.body;

  const candidate = await User.findById(id);
  if (!candidate || candidate.role !== "user") {
    return res.status(404).json({ error: "Candidate not found" });
  }

  // 🔥 For now, just log reports — later you can add Report model
  console.log(`Candidate ${id} reported by ${req.user._id}: ${reason}`);

  res.json({ message: "Candidate reported successfully" });
};