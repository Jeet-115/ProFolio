// routes/templateFiles.js
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const templatesDir = path.join(process.cwd(), "templates");

// Get all templates list
router.get("/", (req, res) => {
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith(".json"));
  const templates = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(templatesDir, file), "utf-8"));
    return { id: content.id, name: content.name };
  });
  res.json(templates);
});

// Get a single template schema
router.get("/:id", (req, res) => {
  const jsonPath = path.join(templatesDir, `${req.params.id}.json`);
  if (!fs.existsSync(jsonPath)) return res.status(404).json({ error: "Template not found" });
  const content = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  res.json(content);
});

export default router;
