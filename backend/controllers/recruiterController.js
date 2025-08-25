import User from "../models/user.js";

// Get all recruiters
export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" })
      .select("fullName email companyDetails status approved");
    res.status(200).json(recruiters);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recruiters", error: err.message });
  }
};

// Get recruiter by ID
export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await User.findById(req.params.id)
      .select("fullName email role companyDetails status approved");
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });
    res.status(200).json(recruiter);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recruiter", error: err.message });
  }
};

// Already have this:
export const getRecruiterReportsMade = async (req, res) => {
  try {
    const { id } = req.params;

    const recruiter = await User.findById(id)
      .select("fullName email role companyDetails reportsMade")
      .populate("reportsMade.candidateId", "fullName email profilePicture headline");

    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({
      recruiter: {
        id: recruiter._id,
        fullName: recruiter.fullName,
        email: recruiter.email,
        company: recruiter.companyDetails?.companyName,
      },
      reportsMade: recruiter.reportsMade,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recruiter reports", error: err.message });
  }
};

// 🔹 Bookmarked candidates by recruiter
export const getRecruiterBookmarks = async (req, res) => {
  try {
    const recruiter = await User.findById(req.params.id)
      .select("bookmarkedCandidates")
      .populate("bookmarkedCandidates.candidateId", "fullName email profilePicture headline");

    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    res.status(200).json(recruiter.bookmarkedCandidates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookmarks", error: err.message });
  }
};

// 🔹 Contacted candidates by recruiter
export const getRecruiterContacted = async (req, res) => {
  try {
    const recruiter = await User.findById(req.params.id)
      .select("contactedCandidates")
      .populate("contactedCandidates.candidateId", "fullName email profilePicture headline");

    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    res.status(200).json(recruiter.contactedCandidates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacted candidates", error: err.message });
  }
};