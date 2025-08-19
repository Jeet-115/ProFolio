import { useEffect, useState } from "react";
import { getUserPortfolios, deletePortfolio } from "../../services/portfolioService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function PortfolioHistory() {
  const [portfolios, setPortfolios] = useState([]);
  const navigate = useNavigate();

  // Load portfolios on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserPortfolios();
        setPortfolios(data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
      } catch (err) {
        toast.error("Failed to load portfolios");
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/portfolio/builder?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio?")) return;
    try {
      await deletePortfolio(id);
      setPortfolios((prev) => prev.filter((p) => p._id !== id));
      toast.success("Portfolio deleted");
    } catch (err) {
      toast.error("Failed to delete portfolio");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Portfolios</h1>
      {portfolios.length === 0 ? (
        <p className="text-gray-600">No portfolios found. Create one to get started!</p>
      ) : (
        <div className="space-y-4">
          {portfolios.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between border rounded p-4 shadow-sm"
            >
              <div>
                <h2 className="font-medium">{p.name}</h2>
                <p className="text-sm text-gray-500">
                  Tech: {p.techStack} | Last updated:{" "}
                  {new Date(p.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
