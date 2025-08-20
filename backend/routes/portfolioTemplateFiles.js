// routes/portfolioTemplateFiles.js
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const portfolioTemplatesDir = path.join(process.cwd(), "portfolio-templates");

// ✅ Get all portfolio templates list
router.get("/", (req, res) => {
  try {
    const files = fs.readdirSync(portfolioTemplatesDir).filter((f) =>
      f.endsWith(".json")
    );

    const templates = files.map((file) => {
      const content = JSON.parse(
        fs.readFileSync(path.join(portfolioTemplatesDir, file), "utf-8")
      );
      return { id: content.id, name: content.name };
    });

    res.json(templates);
  } catch (error) {
    console.error("Error reading portfolio templates:", error);
    res.status(500).json({ error: "Failed to load portfolio templates" });
  }
});

// ✅ Get a single portfolio template schema
router.get("/:id", (req, res) => {
  try {
    const jsonPath = path.join(portfolioTemplatesDir, `${req.params.id}.json`);

    if (!fs.existsSync(jsonPath)) {
      return res.status(404).json({ error: "Template not found" });
    }

    const content = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    res.json(content);
  } catch (error) {
    console.error("Error loading portfolio template:", error);
    res.status(500).json({ error: "Failed to load template" });
  }
});

export default router;
