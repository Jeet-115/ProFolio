import Portfolio from "../models/portfolio.js";

// Create new portfolio project
export const createPortfolio = async (req, res) => {
  const { name, files, techStack } = req.body;

  // ✅ Require name only (not files)
  if (!name) {
    return res.status(400).json({ error: "Portfolio name is required" });
  }

  // Default boilerplate files
  const defaultFiles = [
    {
      name: "index.html",
      content:
        "<!DOCTYPE html><html><head><title>My Portfolio</title></head><body><h1>Hello World</h1></body></html>",
    },
    { name: "style.css", content: "body { font-family: sans-serif; }" },
    { name: "script.js", content: "console.log('Portfolio ready!');" },
  ];

  const portfolio = new Portfolio({
    user: req.user._id,
    name,
    files: files && files.length ? files : defaultFiles, // fallback to defaults
    techStack: techStack || "HTML-CSS-JS",
  });

  await portfolio.save();
  res.status(201).json({ message: "Portfolio created", portfolio });
};

// Get all user portfolios
export const getUserPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({ user: req.user._id }).sort({
    updatedAt: -1,
  });
  res.json(portfolios);
};

// Get single portfolio
export const getPortfolioById = async (req, res) => {
  const portfolio = await Portfolio.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
  res.json(portfolio);
};

// Update portfolio (files or name)
export const updatePortfolio = async (req, res) => {
  const { name, files } = req.body;
  const portfolio = await Portfolio.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name, files, updatedAt: Date.now() },
    { new: true }
  );
  if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
  res.json({ message: "Portfolio updated", portfolio });
};

// Delete portfolio
export const deletePortfolio = async (req, res) => {
  const deleted = await Portfolio.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ error: "Portfolio not found" });
  res.json({ message: "Portfolio deleted successfully" });
};
