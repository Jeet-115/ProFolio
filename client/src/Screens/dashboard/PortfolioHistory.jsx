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
import GlassButton from "../../Components/Common/GlassButton";
import GlassCard from "../../Components/Common/GlassCard";

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
                className="transition"
              >
                <GlassCard className="p-4 rounded-2xl">
                  <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                  {p.type === "template" && (
                    <p className="text-sm text-gray-300 mb-2">
                      Template: {p.templateName}
                    </p>
                  )}
                  <p className="text-white text-sm mb-4">
                    Last updated: {new Date(p.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <GlassButton variant="solid" accent="blue" onClick={() => handleEdit(p)}>
                      Edit
                    </GlassButton>
                    <GlassButton variant="solid" accent="red" onClick={() => handleDelete(p)}>
                      Delete
                    </GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
