import User from "../models/user.js";

// 1. Recruiter Profile (company + personal info)
export const getRecruiterProfile = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id, {
    hash: 0,
    salt: 0,
    password: 0,
  });

  res.json({
    fullName: recruiter.fullName,
    email: recruiter.email,
    company: recruiter.username, // OR add dedicated companyName field later
    profilePicture: recruiter.profilePicture,
    socialLinks: recruiter.socialLinks,
  });
};

// 2. Quick Stats
export const getRecruiterStats = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id);

  res.json({
    viewedCount: recruiter.viewedCandidates.length,
    bookmarkedCount: recruiter.bookmarkedCandidates.length,
    contactedCount: recruiter.contactedCandidates.length,
  });
};

// 3. Recently Viewed Candidates
export const getRecentCandidates = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id).populate({
    path: "viewedCandidates.candidateId",
    select: "fullName bio profilePicture role",
  });

  const recent = recruiter.viewedCandidates
    .sort((a, b) => b.viewedAt - a.viewedAt)
    .slice(0, 5);

  res.json(recent);
};

// 4. Suggested Candidates (basic matching by recruiter preferences)
export const getSuggestedCandidates = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id);

  // Basic example: find users with role "user" and public portfolio/resume
  const suggestions = await User.find(
    { role: "user", "preferences.privacy.portfolioVisibility": "public" },
    "fullName bio profilePicture"
  ).limit(5);

  res.json(suggestions);
};
