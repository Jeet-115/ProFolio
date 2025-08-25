import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createTemplatePortfolio,
  getTemplatePortfolioById,
  updateTemplatePortfolio,
} from "../../services/templatePortfolioService";
import { getPortfolioTemplateFileById } from "../../services/portfolioTemplateFiles";
import ThemedInput from "../../Components/Common/ThemedInput";
import GlassButton from "../../Components/Common/GlassButton";

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
            {f.type === "text" || f.type === "textarea" ? (
              <ThemedInput
                label={f.label}
                required={f.required}
                value={formData[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                name={f.name}
                type={f.type === "textarea" ? "textarea" : "text"}
              />
            ) : f.type === "list" ? (
              <div>
                <label className="block mb-2 font-semibold">{f.label}</label>
                {(formData[f.name] || [""]).map((item, idx) => (
                  <div key={idx} className="mb-2">
                    <ThemedInput
                      label={`${f.label} ${idx + 1}`}
                      value={item}
                      onChange={(e) => updateListItem(f.name, idx, e.target.value)}
                      name={`${f.name}_${idx}`}
                    />
                  </div>
                ))}
                <GlassButton accent="green" type="button" onClick={() => addListItem(f.name)}>
                  + Add {f.label}
                </GlassButton>
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
                          <label className="block text-sm mb-1">{sf.label}</label>
                          {(item[sf.name] || [""]).map((val, li) => (
                            <div key={li} className="mb-1">
                              <ThemedInput
                                label={`${sf.label} ${li + 1}`}
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
                                name={`${sf.name}_${li}`}
                              />
                            </div>
                          ))}
                          <GlassButton accent="green" type="button" onClick={() => addRepeatableListItem(f.name, idx, sf.name)}>
                            + Add {sf.label}
                          </GlassButton>
                        </div>
                      ) : (
                        <div key={sf.name}>
                          <ThemedInput
                            label={sf.label}
                            value={item[sf.name] || ""}
                            onChange={(e) =>
                              updateRepeatableItem(
                                f.name,
                                idx,
                                sf.name,
                                e.target.value
                              )
                            }
                            name={sf.name}
                          />
                        </div>
                      )
                    )}
                  </div>
                ))}
                <GlassButton accent="blue" type="button" onClick={() => addRepeatableItem(f.name, f.fields)}>
                  + Add {f.label}
                </GlassButton>
              </div>
            ) : null}
          </div>
        ))}

        <div className="mt-4 flex gap-3 flex-wrap">
          <GlassButton accent="blue" onClick={handleSubmit}>Save Portfolio</GlassButton>
          <GlassButton accent="green" type="button" onClick={() => downloadFile("pdf")}>
            Download PDF
          </GlassButton>
          <GlassButton accent="indigo" type="button" onClick={() => downloadFile("html")}>
            Download HTML
          </GlassButton>
          <GlassButton accent="gray" type="button" onClick={() => downloadFile("txt")}>
            Download .txt
          </GlassButton>
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
