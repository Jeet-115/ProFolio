import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getUserPortfolios,
  deletePortfolio as deleteBuilderPortfolio,
} from "../../services/portfolioService";
import {
  getTemplatePortfolios,
  deleteTemplatePortfolio,
} from "../../services/templatePortfolioService";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioHistory() {
  const [portfolios, setPortfolios] = useState([]);
  const navigate = useNavigate();

  const fetchPortfolios = async () => {
    try {
      const [builderRes, templateRes] = await Promise.all([
        getUserPortfolios(),
        getTemplatePortfolios(),
      ]);

      // add type labels
      const formattedBuilder = builderRes.data.map((p) => ({
        ...p,
        type: "builder",
      }));
      const formattedTemplate = templateRes.data.map((p) => ({
        ...p,
        type: "template",
      }));

      // merge + sort
      setPortfolios(
        [...formattedBuilder, ...formattedTemplate].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load portfolios");
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (portfolio) => {
    if (!window.confirm("Delete this portfolio?")) return;
    try {
      if (portfolio.type === "builder") {
        await deleteBuilderPortfolio(portfolio._id);
      } else {
        await deleteTemplatePortfolio(portfolio._id);
      }
      setPortfolios((prev) => prev.filter((p) => p._id !== portfolio._id));
      toast.success("Portfolio deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete portfolio");
    }
  };

  const handleEdit = (portfolio) => {
    if (portfolio.type === "builder") {
      navigate(`/dashboard/portfolio-builder?id=${portfolio._id}`);
    } else {
      navigate(
        `/dashboard/portfolio-templates/${portfolio.templateId}/edit/${portfolio._id}`
      );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Portfolios</h1>

      <AnimatePresence>
        {portfolios.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500"
          >
            No portfolios found. Create one to get started!
          </motion.p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                {p.type === "template" && (
                  <p className="text-sm text-gray-500 mb-2">
                    Template: {p.templateName}
                  </p>
                )}
                <p className="text-gray-500 text-sm mb-4">
                  Last updated: {new Date(p.updatedAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
