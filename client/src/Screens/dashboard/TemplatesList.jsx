import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTemplateFiles } from "../../services/templateFiles"; // adjust path as needed

export default function TemplatesList() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const { data } = await getTemplateFiles();
        // data is like [{id: 'modern_resume', name: 'Modern Resume'}]
        // if you have thumbnails, add them here manually or from backend
        const withThumbnails = data.map((tpl) => ({
          ...tpl,
          thumbnail: `/templates/${tpl.id}.png` // you can store thumbnails in public/templates
        }));
        setTemplates(withThumbnails);
      } catch (err) {
        console.error("Failed to load templates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  if (loading) {
    return <div className="text-white">Loading templates...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose a Resume Template</h2>
      {templates.length === 0 ? (
        <p className="text-gray-300">No templates available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <motion.div
              key={tpl.id}
              className="bg-white/20 p-4 rounded-xl cursor-pointer hover:bg-white/30"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/dashboard/templates/resumes/${tpl.id}/fill`)}
            >
              {tpl.thumbnail && (
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  className="rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{tpl.name}</h3>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
