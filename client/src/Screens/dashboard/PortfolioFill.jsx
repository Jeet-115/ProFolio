import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createTemplatePortfolio,
  getTemplatePortfolioById,
  updateTemplatePortfolio,
} from "../../services/templatePortfolioService";
import { getPortfolioTemplateFileById } from "../../services/portfolioTemplateFiles";

export default function PortfolioFill() {
  const { templateId, portfolioId } = useParams();
  const navigate = useNavigate();
  const [schema, setSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [portfolioName, setPortfolioName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // Fetch schema on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch schema
        const { data: schemaData } = await getPortfolioTemplateFileById(
          templateId
        );
        setSchema(schemaData);

        // 2. If editing, fetch existing portfolio
        if (portfolioId) {
          setIsEdit(true);
          const { data: portfolio } = await getTemplatePortfolioById(
            portfolioId
          );
          setFormData(portfolio.fields || {});
          setPortfolioName(portfolio.name || `My ${schemaData.name} portfolio`);
        } else {
          setPortfolioName(`My ${schemaData.name} portfolio`); // <-- default in create
        }
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    fetchData();
  }, [templateId, portfolioId]);

  // Handle single field update
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle list of simple strings
  const addListItem = (field) => {
    const current = formData[field] || [""];
    setFormData({ ...formData, [field]: [...current, ""] });
  };

  const updateListItem = (field, index, value) => {
    const list = [...(formData[field] || [])];
    list[index] = value;
    setFormData({ ...formData, [field]: list });
  };

  // Handle repeatable groups (like projects, experiences)
  const addRepeatableItem = (field, fields) => {
    const current = formData[field] || [];
    const newItem = {};
    fields.forEach((sf) => {
      newItem[sf.name] = sf.type === "list" ? [""] : "";
    });
    setFormData({ ...formData, [field]: [...current, newItem] });
  };

  const updateRepeatableItem = (field, index, subField, value) => {
    const group = [...(formData[field] || [])];
    group[index] = { ...group[index], [subField]: value };
    setFormData({ ...formData, [field]: group });
  };

  const updateRepeatableListItem = (
    field,
    index,
    subField,
    listIndex,
    value
  ) => {
    const group = [...(formData[field] || [])];
    const list = [...(group[index][subField] || [])];
    list[listIndex] = value;
    group[index] = { ...group[index], [subField]: list };
    setFormData({ ...formData, [field]: group });
  };

  const addRepeatableListItem = (field, index, subField) => {
    const group = [...(formData[field] || [])];
    const list = [...(group[index][subField] || [])];
    list.push("");
    group[index] = { ...group[index], [subField]: list };
    setFormData({ ...formData, [field]: group });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateTemplatePortfolio(portfolioId, {
          templateId: schema._id || schema.id,
          templateName: schema.name,
          name: portfolioName,
          fields: formData,
        });
        alert("Portfolio updated successfully!");
      } else {
        await createTemplatePortfolio({
          templateId: schema._id || schema.id,
          templateName: schema.name,
          name: portfolioName || `My ${schema.name} portfolio`,
          fields: formData,
        });
        alert("Portfolio created successfully!");
      }
      navigate("/dashboard/portfolio-templates");
    } catch (err) {
      console.error("Error saving portfolio", err);
    }
  };

  const downloadFile = async (format) => {
    try {
      const { data } = await renderTemplate(templateId, formData, format);
      const blob = new Blob([data], {
        type:
          format === "pdf"
            ? "application/pdf"
            : format === "html"
            ? "text/html"
            : "text/plain;charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${schema.id}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed", e);
      alert("Failed to download. Try again.");
    }
  };

  if (!schema) return <p>Loading template...</p>;

  return (
    <div className="flex gap-6">
      {/* Form Section */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Fill {schema.name} Template</h2>
        {schema.fields.map((f) => (
          <div key={f.name} className="mb-6">
            <label className="block mb-2 font-semibold">{f.label}</label>

            {f.type === "text" || f.type === "textarea" ? (
              <input
                type="text"
                required={f.required}
                value={formData[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="block w-full p-2 rounded text-black"
              />
            ) : f.type === "list" ? (
              <div>
                {(formData[f.name] || [""]).map((item, idx) => (
                  <input
                    key={idx}
                    value={item}
                    onChange={(e) =>
                      updateListItem(f.name, idx, e.target.value)
                    }
                    className="block w-full mb-2 p-2 rounded text-black"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(f.name)}
                  className="bg-green-500 px-3 py-1 rounded text-white"
                >
                  + Add {f.label}
                </button>
              </div>
            ) : f.type === "repeatable" ? (
              <div className="space-y-4">
                {(formData[f.name] || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-400 p-3 rounded space-y-2"
                  >
                    {f.fields.map((sf) =>
                      sf.type === "list" ? (
                        <div key={sf.name}>
                          <label className="block text-sm">{sf.label}</label>
                          {(item[sf.name] || [""]).map((val, li) => (
                            <input
                              key={li}
                              value={val}
                              onChange={(e) =>
                                updateRepeatableListItem(
                                  f.name,
                                  idx,
                                  sf.name,
                                  li,
                                  e.target.value
                                )
                              }
                              className="block w-full mb-1 p-2 rounded text-black"
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              addRepeatableListItem(f.name, idx, sf.name)
                            }
                            className="bg-green-500 px-2 py-1 rounded text-white text-sm"
                          >
                            + Add {sf.label}
                          </button>
                        </div>
                      ) : (
                        <div key={sf.name}>
                          <label className="block text-sm">{sf.label}</label>
                          <input
                            type="text"
                            value={item[sf.name] || ""}
                            onChange={(e) =>
                              updateRepeatableItem(
                                f.name,
                                idx,
                                sf.name,
                                e.target.value
                              )
                            }
                            className="block w-full p-2 rounded text-black"
                          />
                        </div>
                      )
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addRepeatableItem(f.name, f.fields)}
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                >
                  + Add {f.label}
                </button>
              </div>
            ) : null}
          </div>
        ))}

        <div className="mt-4 flex gap-3 flex-wrap">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Save Portfolio
          </button>
          <button
            type="button"
            onClick={() => downloadFile("pdf")}
            className="bg-emerald-600 px-4 py-2 rounded text-white"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => downloadFile("html")}
            className="bg-indigo-600 px-4 py-2 rounded text-white"
          >
            Download HTML
          </button>
          <button
            type="button"
            onClick={() => downloadFile("txt")}
            className="bg-gray-700 px-4 py-2 rounded text-white"
          >
            Download .txt
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 border-l border-white/20 pl-6">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="bg-white text-black p-4 rounded">
          {JSON.stringify(formData, null, 2)}
        </div>
      </div>
    </div>
  );
}
