import { useNavigate } from "react-router-dom";

export default function TechStackSelection() {
  const navigate = useNavigate();

  const handleSelect = (techStack) => {
    // Redirect to builder page with techStack param
    navigate(`/dashboard/portfolio-builder?techStack=${techStack}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Select Tech Stack</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleSelect("HTML-CSS-JS")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        >
          HTML / CSS / JS
        </button>
        <button
          onClick={() => handleSelect("React")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        >
          React (soon)
        </button>
        <button
          onClick={() => handleSelect("Angular")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        >
          Angular (soon)
        </button>
      </div>
    </div>
  );
}
