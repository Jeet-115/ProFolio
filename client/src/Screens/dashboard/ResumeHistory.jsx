import { useEffect, useState } from "react";
import {
  getUserResumes,
  deleteResume as deleteBuilderResume,
} from "../../services/resumeApi";
import {
  getTemplateResumes,
  deleteTemplateResume,
} from "../../services/templateResumeService";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassCard from "../../Components/Common/GlassCard";
import GlassButton from "../../Components/Common/GlassButton";

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const [builderRes, templateRes] = await Promise.all([
        getUserResumes(),
        getTemplateResumes(),
      ]);

      // Add a "type" field to identify the source
      const formattedBuilderRes = builderRes.data.map((r) => ({
        ...r,
        type: "builder",
      }));
      const formattedTemplateRes = templateRes.data.map((r) => ({
        ...r,
        type: "template",
      }));

      setResumes(
        [...formattedBuilderRes, ...formattedTemplateRes].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch resumes");
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (resume) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      if (resume.type === "builder") {
        await deleteBuilderResume(resume._id);
      } else {
        await deleteTemplateResume(resume._id);
      }
      toast.success("Resume deleted");
      setResumes((prev) => prev.filter((r) => r._id !== resume._id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resume");
    }
  };

  const handleEdit = (resume) => {
    if (resume.type === "builder") {
      navigate(`/dashboard/resume-builder/${resume._id}`);
    } else {
      navigate(`/dashboard/templates/resumes/${resume.templateId}/edit/${resume._id}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Resume History</h1>

      <AnimatePresence>
        {resumes.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500"
          >
            No resumes found. Start building one!
          </motion.p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="transition"
              >
                <GlassCard className="p-4 rounded-2xl">
                  <h2 className="text-xl font-semibold mb-2">{resume.name}</h2>
                  {resume.type === "template" && (
                    <p className="text-sm text-gray-300 mb-2">
                      Template: {resume.templateName}
                    </p>
                  )}
                  <p className="text-white text-sm mb-4">
                    Last updated: {new Date(resume.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <GlassButton variant="solid" accent="blue" onClick={() => handleEdit(resume)}>
                      Edit
                    </GlassButton>
                    <GlassButton variant="solid" accent="red" onClick={() => handleDelete(resume)}>
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

export default ResumeHistory;
