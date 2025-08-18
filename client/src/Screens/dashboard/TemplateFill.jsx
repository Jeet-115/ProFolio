import { useParams } from "react-router-dom";
import { useState } from "react";
import { createTemplateResume } from "../../services/templateResumeService";

// Example schema per template (you can fetch from file or backend)
const templateSchemas = {
  modern: {
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: false },
      { name: "projects", label: "Projects", type: "list", required: false },
      { name: "education", label: "Education", type: "list", required: false },
    ],
  },
};

export default function TemplateFill() {
  const { templateId } = useParams();
  const schema = templateSchemas[templateId];
  const [formData, setFormData] = useState({});
  
  // Handle single field update
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle repeatable fields like projects
  const addListItem = (field) => {
    const current = formData[field] || [""];
    setFormData({ ...formData, [field]: [...current, ""] });
  };

  const updateListItem = (field, index, value) => {
    const list = [...(formData[field] || [])];
    list[index] = value;
    setFormData({ ...formData, [field]: list });
  };

  const handleSubmit = async () => {
    await createTemplateResume({
      templateName: templateId,
      name: `My ${templateId} resume`,
      fields: formData,
    });
    alert("Saved successfully!");
  };

  return (
    <div className="flex gap-6">
      {/* Form Section */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Fill {templateId} Template</h2>
        {schema.fields.map((f) => (
          <div key={f.name} className="mb-4">
            <label className="block mb-1">{f.label}</label>
            {f.type === "list" ? (
              <div>
                {(formData[f.name] || [""]).map((item, idx) => (
                  <input
                    key={idx}
                    value={item}
                    onChange={(e) => updateListItem(f.name, idx, e.target.value)}
                    className="block w-full mb-2 p-2 rounded text-black"
                  />
                ))}
                <button
                  onClick={() => addListItem(f.name)}
                  className="bg-green-500 px-3 py-1 rounded text-white"
                  type="button"
                >
                  + Add {f.label}
                </button>
              </div>
            ) : (
              <input
                type="text"
                required={f.required}
                value={formData[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="block w-full p-2 rounded text-black"
              />
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 px-4 py-2 rounded text-white"
        >
          Save Resume
        </button>
      </div>

      {/* Live Preview Section */}
      <div className="flex-1 border-l border-white/20 pl-6">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="bg-white text-black p-4 rounded">
          <h1 className="text-2xl">{formData.fullName}</h1>
          <p>{formData.email}</p>
          <h3 className="font-semibold mt-4">Projects</h3>
          <ul>
            {(formData.projects || []).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Education</h3>
          <ul>
            {(formData.education || []).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
