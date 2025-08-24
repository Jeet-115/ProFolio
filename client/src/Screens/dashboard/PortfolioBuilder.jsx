import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  createPortfolio,
  updatePortfolio,
  getPortfolioById,
} from "../../services/portfolioService";
import { toast } from "react-hot-toast";
import ResumeNameInput from "../../Components/Dashboard/ResumeNameInput";
import SaveButton from "../../Components/Dashboard/SaveButton";

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
      {/* Top bar: project name + save (shared components) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <ResumeNameInput
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name..."
        />
        <div className="flex gap-3">
          <SaveButton onClick={handleSave} disabled={!projectName.trim()} hoverText="Saved!">
            {portfolioId ? "Update Project" : "Save Project"}
          </SaveButton>
        </div>
      </div>

      {/* Laptop-only quick file buttons */}
      {techStack === "HTML-CSS-JS" && (
        <div className="flex gap-4 overflow-x-auto">
          {/* HTML Button */}
          <button
            type="button"
            onClick={() => setActiveFile("index.html")}
            className={`group relative flex items-center justify-start w-[45px] h-[45px] rounded-full overflow-hidden transition-all duration-300 shadow-[2px_2px_10px_rgba(0,0,0,0.2)] bg-[#E34F26] active:translate-x-[2px] active:translate-y-[2px] focus:outline-none border-0`}
            aria-label="Select index.html"
            aria-pressed={activeFile === "index.html"}
          >
            <div className="w-full flex items-center justify-center transition-all duration-300 group-hover:w-[26%] group-focus:w-[26%] group-active:w-[26%] sm:group-hover:w-[28%] sm:group-focus:w-[28%] sm:group-active:w-[28%] lg:group-hover:w-[30%] lg:group-focus:w-[30%] lg:group-active:w-[30%] group-hover:pl-0 group-focus:pl-0 group-active:pl-0 sm:group-hover:pl-1 sm:group-focus:pl-1 sm:group-active:pl-1 lg:group-hover:pl-2 lg:group-focus:pl-2 lg:group-active:pl-2">
              {/* HTML logo */}
              <svg className="w-[25px] h-[25px]" viewBox="0 0 512 512" fill="currentColor">
                <path className="text-white" d="M30.713,0.501L71.717,460.42l184.006,51.078l184.515-51.15L481.287,0.501H30.713z M395.754,109.646   l-2.567,28.596l-1.128,12.681h-0.187H256h-0.197h-79.599l5.155,57.761h74.444H256h115.723h15.201l-1.377,15.146l-13.255,148.506   l-0.849,9.523L256,413.854v0.012l-0.259,0.072l-115.547-32.078l-7.903-88.566h26.098h30.526l4.016,44.986l62.82,16.965l0.052-0.014   v-0.006l62.916-16.977l6.542-73.158H256h-0.197H129.771l-13.863-155.444l-1.351-15.131h141.247H256h141.104L395.754,109.646z" />
              </svg>
            </div>
            <span className="absolute right-0 w-0 opacity-0 text-white font-semibold text-base transition-all duration-300 group-hover:opacity-100 group-hover:w-[95px] sm:group-hover:w-[100px] lg:group-hover:w-[105px] group-focus:opacity-100 group-focus:w-[95px] sm:group-focus:w-[100px] lg:group-focus:w-[105px] group-active:opacity-100 group-active:w-[95px] sm:group-active:w-[100px] lg:group-active:w-[105px] pr-0 sm:pr-2 lg:pr-3 text-right">
              Index.html
            </span>
            <style>{`.group:hover,.group:focus,.group:active{width:150px;border-radius:40px}`}</style>
          </button>

          {/* CSS Button */}
          <button
            type="button"
            onClick={() => setActiveFile("style.css")}
            className={`group relative flex items-center justify-start w-[45px] h-[45px] rounded-full overflow-hidden transition-all duration-300 shadow-[2px_2px_10px_rgba(0,0,0,0.2)] bg-[#1572B6] active:translate-x-[2px] active:translate-y-[2px] focus:outline-none border-0`}
            aria-label="Select style.css"
            aria-pressed={activeFile === "style.css"}
          >
            <div className="w-full flex items-center justify-center transition-all duration-300 group-hover:w-[26%] group-focus:w-[26%] group-active:w-[26%] sm:group-hover:w-[28%] sm:group-focus:w-[28%] sm:group-active:w-[28%] lg:group-hover:w-[30%] lg:group-focus:w-[30%] lg:group-active:w-[30%] group-hover:pl-0 group-focus:pl-0 group-active:pl-0 sm:group-hover:pl-1 sm:group-focus:pl-1 sm:group-active:pl-1 lg:group-hover:pl-2 lg:group-focus:pl-2 lg:group-active:pl-2">
              {/* CSS logo */}
              <svg className="w-[25px] h-[25px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" fill="currentColor">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
              </svg>
            </div>
            <span className="absolute right-0 w-0 opacity-0 text-white font-semibold text-base transition-all duration-300 group-hover:opacity-100 group-hover:w-[90px] sm:group-hover:w-[95px] lg:group-hover:w-[100px] group-focus:opacity-100 group-focus:w-[90px] sm:group-focus:w-[95px] lg:group-focus:w-[100px] group-active:opacity-100 group-active:w-[90px] sm:group-active:w-[95px] lg:group-active:w-[100px] pr-0 sm:pr-1 lg:pr-2 text-right">
              Style.css
            </span>
            <style>{`.group:hover,.group:focus,.group:active{width:150px;border-radius:40px}`}</style>
          </button>

          {/* JS Button */}
          <button
            type="button"
            onClick={() => setActiveFile("script.js")}
            className={`group relative flex items-center justify-start w-[45px] h-[45px] rounded-full overflow-hidden transition-all duration-300 shadow-[2px_2px_10px_rgba(0,0,0,0.2)] bg-[#F7DF1E] active:translate-x-[2px] active:translate-y-[2px] focus:outline-none border-0`}
            aria-label="Select script.js"
            aria-pressed={activeFile === "script.js"}
          >
            <div className="w-full flex items-center justify-center transition-all duration-300 group-hover:w-[26%] group-focus:w-[26%] group-active:w-[26%] sm:group-hover:w-[28%] sm:group-focus:w-[28%] sm:group-active:w-[28%] lg:group-hover:w-[30%] lg:group-focus:w-[30%] lg:group-active:w-[30%] group-hover:pl-0 group-focus:pl-0 group-active:pl-0 sm:group-hover:pl-1 sm:group-focus:pl-1 sm:group-active:pl-1 lg:group-hover:pl-2 lg:group-focus:pl-2 lg:group-active:pl-2">
              {/* JS logo */}
              <svg className="w-[25px] h-[25px]" viewBox="0 0 512 512" fill="currentColor">
                <path d="M1.008,0.5C0.438,0.583,0.48,1.27,0.521,1.958c0,169.668,0,339.31,0,508.974c169.364,1.135,340.808,0.162,510.979,0.486c0-170.309,0-340.61,0-510.918C341.342,0.5,171.167,0.5,1.008,0.5z M259.893,452.167c-11.822,11.919-30.478,18.938-53.429,18.938c-37.643,0-58.543-18.34-71.884-43.711c12.842-8.2,25.966-16.122,39.344-23.795c5.456,15.262,23.886,32.42,44.683,21.857c13.183-6.699,11.661-27.01,11.661-49.054c0-45.773,0-98.578,0-139.872c-0.042-0.688-0.083-1.375,0.482-1.458c15.707,0,31.413,0,47.116,0c0,36.788,0,78.402,0,117.529C277.866,395.199,280.91,430.988,259.893,452.167z M470.696,409.917c-2.674,39.884-35.243,61.063-79.17,61.188c-43.062,0.124-70.624-19.013-87.433-48.567c12.085-8.317,25.778-15.017,38.375-22.822c10.08,15.761,27.537,30.91,53.429,28.652c16.131-1.406,34.856-14.555,24.285-34.482c-5.127-9.66-17.516-14.567-28.656-19.425c-35.352-15.424-76.828-29.571-72.861-84.992c1.327-18.514,9.852-31.525,20.889-40.796c11.311-9.5,26.46-15.867,46.629-16.511c36.629-1.173,56.723,15.12,70.429,37.884c-11.664,8.891-24.514,16.608-37.401,24.281c-4.229-12.995-24.644-25.658-41.772-17.969c-7.789,3.493-14.788,13.761-10.684,26.224c3.66,11.115,18.589,17.199,30.599,22.344C433.706,340.486,474.331,355.693,470.696,409.917z" />
              </svg>
            </div>
            <span className="absolute right-0 w-0 opacity-0 text-black font-semibold text-base transition-all duration-300 group-hover:opacity-100 group-hover:w-[95px] sm:group-hover:w-[100px] lg:group-hover:w-[105px] group-focus:opacity-100 group-focus:w-[95px] sm:group-focus:w-[100px] lg:group-focus:w-[105px] group-active:opacity-100 group-active:w-[95px] sm:group-active:w-[100px] lg:group-active:w-[105px] pr-0 sm:pr-2 lg:pr-3 text-right">
              Script.js
            </span>
            <style>{`.group:hover,.group:focus,.group:active{width:150px;border-radius:40px}`}</style>
          </button>
        </div>
      )}

      

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
