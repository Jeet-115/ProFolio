import Resume from "../models/resume.js";

// Create a new resume
export const createResume = async (req, res) => {
  const { name, content } = req.body;
  const resume = new Resume({
    user: req.user._id,
    name,
    content,
  });
  await resume.save();
  res.status(201).json({ message: "Resume saved successfully", resume });
};

// Get all resumes for logged-in user
export const getUserResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(resumes);
};

// Get a single resume
export const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) return res.status(404).json({ error: "Resume not found" });
  res.json(resume);
};

// Update a resume
export const updateResume = async (req, res) => {
  const { name, content } = req.body;
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name, content, updatedAt: Date.now() },
    { new: true }
  );
  if (!resume) return res.status(404).json({ error: "Resume not found" });
  res.json({ message: "Resume updated", resume });
};

// Delete a resume
export const deleteResume = async (req, res) => {
  const deleted = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ error: "Resume not found" });
  res.json({ message: "Resume deleted successfully" });
};
