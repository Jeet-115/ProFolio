import User from "../models/user.js";

// Get all candidates with filters
export const getCandidates = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { skills, location, experienceLevel, education, search, page = 1, limit = 10 } = req.query;

  const query = { role: "user" };

  // 🔍 Apply filters
  if (skills) {
    query.skills = { $in: skills.split(",") }; // supports multiple skills
  }
  if (location) {
    query.location = new RegExp(location, "i"); // case-insensitive
  }
  if (experienceLevel) {
    query.experienceLevel = experienceLevel;
  }
  if (education) {
    query.education = new RegExp(education, "i");
  }
  if (search) {
    query.$or = [
      { fullName: new RegExp(search, "i") },
      { headline: new RegExp(search, "i") },
      { skills: new RegExp(search, "i") },
    ];
  }

  // 📄 Pagination
  const skip = (page - 1) * limit;

  const [candidates, total] = await Promise.all([
    User.find(query, "fullName headline skills location profilePicture")
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(query),
  ]);

  res.json({
    candidates,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};

// 📌 Bookmark Candidate
export const bookmarkCandidate = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params; // candidateId from URL
  const { notes } = req.body;

  // ensure candidate exists
  const candidate = await User.findById(id);
  if (!candidate || candidate.role !== "user") {
    return res.status(404).json({ error: "Candidate not found" });
  }

  // get recruiter
  const recruiter = await User.findById(req.user._id);

  // check if already bookmarked
  const alreadyBookmarked = recruiter.bookmarkedCandidates.some(
    (b) => b.candidateId.toString() === id
  );
  if (alreadyBookmarked) {
    return res.status(400).json({ error: "Already bookmarked" });
  }

  // push new bookmark
  recruiter.bookmarkedCandidates.push({
    candidateId: id,
    notes: notes || "",
    bookmarkedAt: new Date(),
  });

  await recruiter.save();

  res.json({ message: "Candidate bookmarked successfully" });
};