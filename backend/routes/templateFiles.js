// routes/templateFiles.js
import express from "express";
import path from "path";
import fs from "fs";
import { execFile } from "child_process";
import tmp from "tmp";

const router = express.Router();
const templatesDir = path.join(process.cwd(), "templates");

// Get all templates list
router.get("/", (req, res) => {
  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith(".json"));
  const templates = files.map((file) => {
    const content = JSON.parse(
      fs.readFileSync(path.join(templatesDir, file), "utf-8")
    );
    return { id: content.id, name: content.name };
  });
  res.json(templates);
});

// Get a single template schema
router.get("/:id", (req, res) => {
  const jsonPath = path.join(templatesDir, `${req.params.id}.json`);
  if (!fs.existsSync(jsonPath))
    return res.status(404).json({ error: "Template not found" });
  const content = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  res.json(content);
});

export default router;

// ---------------------- Rendering utilities & route ----------------------

// Minimal LaTeX escaping to avoid compilation errors
function escapeLatex(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/\\/g, "\\\\")
    .replace(/([#%&_{}])/g, "\\$1")
    .replace(/\^/g, "\\^")
    .replace(/~/g, "\\~{}");
}

function sanitizeData(input) {
  if (Array.isArray(input)) {
    return input.map((v) => sanitizeData(v));
  }
  if (input && typeof input === "object") {
    const out = {};
    for (const key of Object.keys(input)) {
      out[key] = sanitizeData(input[key]);
    }
    return out;
  }
  return escapeLatex(input);
}

// Very small template engine supporting {{var}} and {{#each arr}}...{{/each}} with nested blocks and {{this}}
function renderVariables(template, context) {
  return template.replace(/{{\s*([\w.]+)\s*}}/g, (_m, keyPath) => {
    if (keyPath === "this") return typeof context === "string" ? context : "";
    const parts = keyPath.split(".");
    let cur = context;
    for (const p of parts) {
      if (cur == null) return "";
      cur = cur[p];
    }
    return cur == null ? "" : String(cur);
  });
}

function renderEachBlocks(template, context) {
  const eachRegex = /{{#each\s+([\w.]+)\s*}}([\s\S]*?){{\/each}}/g;
  let result = template;
  let match;
  while ((match = eachRegex.exec(template)) !== null) {
    const [whole, keyPath, block] = match;
    const parts = keyPath.split(".");
    let cur = context;
    for (const p of parts) {
      if (cur == null) break;
      cur = cur[p];
    }
    const arr = Array.isArray(cur) ? cur : [];
    const rendered = arr
      .map((item) => renderTemplateBlock(block, item))
      .join("");
    result = result.replace(whole, rendered);
  }
  return result;
}

function renderTemplateBlock(block, context) {
  // Recursively render nested each blocks first
  const withEach = renderEachBlocks(block, context);
  // Then render simple variables
  return renderVariables(withEach, context);
}

function renderLatexTemplate(templateContent, data) {
  // Start from root context for each blocks
  const withEach = renderEachBlocks(templateContent, data);
  // Replace remaining variables from root
  return renderVariables(withEach, data);
}

function buildDataModel(fields = {}) {
  const model = {
    full_name: fields.full_name || "",
    location: fields.location || "",
    phone: fields.phone || "",
    email: fields.email || "",
    website: fields.website || "",
    website_display: fields.website_display || fields.website || "",
    summary: fields.summary || "",
    education: [],
    experience: [],
    projects: [],
    skill_advanced: fields.skill_advanced || "",
    skill_proficient: fields.skill_proficient || "",
    skill_familiar: fields.skill_familiar || "",
    languages: fields.languages || "",
  };

  // Education: convert single-entry fields into an array of one
  if (
    fields.edu_institute ||
    fields.edu_location ||
    fields.edu_degree ||
    fields.edu_year ||
    fields.edu_coursework
  ) {
    model.education.push({
      institute: fields.edu_institute || "",
      location: fields.edu_location || "",
      degree: fields.edu_degree || "",
      year: fields.edu_year || "",
      coursework: fields.edu_coursework || "",
    });
  }

  // Work experience: array of groups -> expected keys
  if (Array.isArray(fields.work_experience)) {
    model.experience = fields.work_experience.map((exp) => ({
      company: exp.exp_company || "",
      location: exp.exp_location || "",
      role: exp.exp_role || "",
      duration: exp.exp_duration || "",
      points: Array.isArray(exp.exp_points)
        ? exp.exp_points.filter((p) => p && String(p).trim().length > 0)
        : [],
    }));
  }

  // Projects: array of groups -> expected keys
  if (Array.isArray(fields.projects)) {
    model.projects = fields.projects.map((proj) => ({
      name: proj.proj_name || "",
      date: proj.proj_date || "",
      points: Array.isArray(proj.proj_points)
        ? proj.proj_points.filter((p) => p && String(p).trim().length > 0)
        : [],
    }));
  }

  return model;
}

function buildPlainText(model) {
  const lines = [];
  if (model.full_name) lines.push(model.full_name);
  const headerBits = [
    model.location,
    model.phone,
    model.email,
    model.website,
  ].filter(Boolean);
  if (headerBits.length) lines.push(headerBits.join(" | "));
  if (model.summary) {
    lines.push("");
    lines.push("Summary:");
    lines.push(model.summary);
  }
  if (Array.isArray(model.education) && model.education.length) {
    lines.push("");
    lines.push("Education:");
    for (const e of model.education) {
      lines.push(`${e.institute}${e.location ? `, ${e.location}` : ""}`);
      const line2 = [e.degree, e.year].filter(Boolean).join(" | ");
      if (line2) lines.push(line2);
      if (e.coursework) lines.push(`Coursework: ${e.coursework}`);
    }
  }
  if (Array.isArray(model.experience) && model.experience.length) {
    lines.push("");
    lines.push("Work Experience:");
    for (const x of model.experience) {
      lines.push(`${x.company}${x.location ? `, ${x.location}` : ""}`);
      const line2 = [x.role, x.duration].filter(Boolean).join(" | ");
      if (line2) lines.push(line2);
      for (const p of x.points || []) lines.push(`- ${p}`);
    }
  }
  if (Array.isArray(model.projects) && model.projects.length) {
    lines.push("");
    lines.push("Projects:");
    for (const p of model.projects) {
      lines.push(`${p.name}${p.date ? `, ${p.date}` : ""}`);
      for (const pt of p.points || []) lines.push(`- ${pt}`);
    }
  }
  if (
    model.skill_advanced ||
    model.skill_proficient ||
    model.skill_familiar ||
    model.languages
  ) {
    lines.push("");
    lines.push("Skills:");
    if (model.skill_advanced) lines.push(`Advanced: ${model.skill_advanced}`);
    if (model.skill_proficient)
      lines.push(`Proficient: ${model.skill_proficient}`);
    if (model.skill_familiar) lines.push(`Familiar: ${model.skill_familiar}`);
    if (model.languages) lines.push(`Languages: ${model.languages}`);
  }
  return lines.join("\n");
}

router.post("/render/:id", express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const format = String(req.query.format || "pdf").toLowerCase();
    const { fields } = req.body || {};

    const texPath = path.join(templatesDir, `${id}.tex`);
    if (!fs.existsSync(texPath)) {
      return res.status(404).json({ error: "Template not found" });
    }
    const texTemplate = fs.readFileSync(texPath, "utf-8");

    const model = buildDataModel(fields || {});
    const renderedTex = renderLatexTemplate(texTemplate, sanitizeData(model));

    if (format === "tex") {
      res.setHeader("Content-Type", "application/x-tex");
      res.setHeader("Content-Disposition", `attachment; filename="${id}.tex"`);
      return res.send(renderedTex);
    }

    if (format === "txt") {
      const txt = buildPlainText(model);
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${id}.txt"`);
      return res.send(txt);
    }

    // Default: try to compile PDF using xelatex (required for fontspec)
    const temp = tmp.dirSync({ unsafeCleanup: true });
    const outBase = path.join(temp.name, id);
    const texOutPath = `${outBase}.tex`;
    fs.writeFileSync(texOutPath, renderedTex, "utf-8");

    execFile(
      "xelatex",
      [
        "-interaction=nonstopmode",
        "-halt-on-error",
        "-output-directory",
        temp.name,
        texOutPath,
      ],
      { cwd: temp.name },
      (err) => {
        if (err) {
          // Fallback: return the .tex if compilation fails
          try {
            temp.removeCallback?.();
          } catch (_) {}
          res.setHeader("Content-Type", "application/x-tex");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="${id}.tex"`
          );
          return res.send(renderedTex);
        }
        const pdfPath = `${outBase}.pdf`;
        if (!fs.existsSync(pdfPath)) {
          try {
            temp.removeCallback?.();
          } catch (_) {}
          res.setHeader("Content-Type", "application/x-tex");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="${id}.tex"`
          );
          return res.send(renderedTex);
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${id}.pdf"`
        );
        const stream = fs.createReadStream(pdfPath);
        stream.on("end", () => {
          try {
            temp.removeCallback?.();
          } catch (_) {}
        });
        stream.pipe(res);
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to render template" });
  }
});
