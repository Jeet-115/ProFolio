import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  createPortfolio,
  updatePortfolio,
  getPortfolioById,
} from "../../services/portfolioService";
import { toast } from "react-hot-toast";

const defaultFiles = [
  {
    name: "index.html",
    content:
      "<!DOCTYPE html><html><head><title>My Portfolio</title></head><body><h1>Hello World</h1></body></html>",
  },
  { name: "style.css", content: "body { font-family: sans-serif; }" },
  { name: "script.js", content: "console.log('Portfolio ready!');" },
];

export default function PortfolioBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const qs = new URLSearchParams(location.search);

  const techStack = qs.get("techStack") || "HTML-CSS-JS";
  const initialId = qs.get("id"); // when editing existing
  const [portfolioId, setPortfolioId] = useState(initialId || null);

  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState(defaultFiles);
  const [activeFile, setActiveFile] = useState("index.html");

  // If editing, fetch current project
  useEffect(() => {
    const load = async () => {
      if (!portfolioId) return;
      try {
        const { data } = await getPortfolioById(portfolioId);
        setProjectName(data.name);
        setFiles(data.files);
        setActiveFile(data.files?.[0]?.name || "index.html");
      } catch (e) {
        toast.error("Failed to load portfolio");
      }
    };
    load();
  }, [portfolioId]);

  const currentFile = files.find((f) => f.name === activeFile);

  const handleCodeChange = (value) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.name === activeFile ? { ...f, content: value || "" } : f
      )
    );
  };

  const handleSave = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name before saving.");
      return;
    }
    try {
      if (portfolioId) {
        // ✅ update existing, include techStack too
        await updatePortfolio(portfolioId, {
          name: projectName,
          files,
          techStack,
        });
        toast.success("Project updated!");
      } else {
        // ✅ create new
        const { data } = await createPortfolio({
          name: projectName,
          files,
          techStack,
        });
        const newId = data.portfolio._id;
        setPortfolioId(newId);

        // Update URL to include id so future saves are updates
        const next = new URLSearchParams(location.search);
        next.set("id", newId);
        navigate(`/dashboard/portfolio/builder?${next.toString()}`, {
          replace: true,
        });

        toast.success("Project created!");
      }
    } catch (e) {
      toast.error(e.response?.data?.error || "Error saving project");
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Top bar: name + save */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {files.map((f) => (
          <button
            key={f.name}
            onClick={() => setActiveFile(f.name)}
            className={`px-3 py-1 rounded ${
              activeFile === f.name ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Editor */}
      {currentFile && (
        <Editor
          height="70vh"
          theme="vs-dark"
          language={
            currentFile.name.endsWith(".html")
              ? "html"
              : currentFile.name.endsWith(".css")
              ? "css"
              : "javascript"
          }
          value={currentFile.content}
          onChange={handleCodeChange}
        />
      )}
    </div>
  );
}
