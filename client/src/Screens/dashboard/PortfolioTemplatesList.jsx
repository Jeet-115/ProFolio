import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getPortfolioTemplateFiles } from "../../services/portfolioTemplateFiles"; // adjust path if needed

export default function PortfolioTemplatesList() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const { data } = await getPortfolioTemplateFiles();
        // data is like [{id: 'modern_portfolio', name: 'Modern Portfolio'}]
        const withThumbnails = data.map((tpl) => ({
          ...tpl,
          thumbnail: `/portfolio-thumbnails/${tpl.id}.png`, 
          // place thumbnails in public/portfolio-thumbnails/
        }));
        setTemplates(withThumbnails);
      } catch (err) {
        console.error("Failed to load portfolio templates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  if (loading) {
    return <div className="text-white">Loading portfolio templates...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose a Portfolio Template</h2>
      {templates.length === 0 ? (
        <p className="text-gray-300">No templates available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <motion.div
              key={tpl.id}
              className="bg-white/20 p-4 rounded-xl cursor-pointer hover:bg-white/30"
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                navigate(`/dashboard/portfolio-templates/${tpl.id}/fill`)
              }
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
