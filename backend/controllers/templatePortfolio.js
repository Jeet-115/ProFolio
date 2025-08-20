import TemplatePortfolio from "../models/templatePortfolio.js";

// ✅ Create and save a new template portfolio
export const createTemplatePortfolio = async (req, res) => {
  const { templateId, templateName, name, fields } = req.body;
  const newPortfolio = new TemplatePortfolio({
    user: req.user._id,
    templateId,
    templateName,
    name,
    fields,
  });
  await newPortfolio.save();
  res.status(201).json({ message: "Template portfolio saved!", portfolio: newPortfolio });
};

// ✅ Get all template portfolios for logged in user
export const getTemplatePortfolios = async (req, res) => {
  const portfolios = await TemplatePortfolio.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(portfolios);
};

// ✅ Get one template portfolio by ID
export const getTemplatePortfolioById = async (req, res) => {
  const portfolio = await TemplatePortfolio.findOne({ _id: req.params.id, user: req.user._id });
  if (!portfolio) return res.status(404).json({ error: "Template portfolio not found" });
  res.json(portfolio);
};

// ✅ Update a template portfolio (edit fields)
export const updateTemplatePortfolio = async (req, res) => {
  const { templateId, templateName, name, fields } = req.body;
  const portfolio = await TemplatePortfolio.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { templateId, templateName, name, fields, updatedAt: Date.now() },
    { new: true }
  );
  if (!portfolio) return res.status(404).json({ error: "Template portfolio not found" });
  res.json({ message: "Template portfolio updated!", portfolio });
};

// ✅ Delete a template portfolio
export const deleteTemplatePortfolio = async (req, res) => {
  const deleted = await TemplatePortfolio.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ error: "Template portfolio not found" });
  res.json({ message: "Template portfolio deleted!" });
};
