import TemplateResume from "../models/templateResume.js";

// Create and save a new template resume
export const createTemplateResume = async (req, res) => {
  const { templateId, templateName, name, fields } = req.body; // ✅ added templateId
  const newResume = new TemplateResume({
    user: req.user._id,
    templateId,    // ✅ save it
    templateName,
    name,
    fields,
  });
  await newResume.save();
  res.status(201).json({ message: "Template resume saved!", resume: newResume });
};

// Get all template resumes for logged in user
export const getTemplateResumes = async (req, res) => {
  const resumes = await TemplateResume.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(resumes);
};

// Get one template resume by ID
export const getTemplateResumeById = async (req, res) => {
  const resume = await TemplateResume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) return res.status(404).json({ error: "Template resume not found" });
  res.json(resume);
};

// Update a template resume (edit fields)
export const updateTemplateResume = async (req, res) => {
  const { templateId, templateName, name, fields } = req.body; // ✅ include templateId
  const resume = await TemplateResume.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { templateId, templateName, name, fields, updatedAt: Date.now() },
    { new: true }
  );
  if (!resume) return res.status(404).json({ error: "Template resume not found" });
  res.json({ message: "Template resume updated!", resume });
};

// Delete a template resume
export const deleteTemplateResume = async (req, res) => {
  const deleted = await TemplateResume.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ error: "Template resume not found" });
  res.json({ message: "Template resume deleted!" });
};
