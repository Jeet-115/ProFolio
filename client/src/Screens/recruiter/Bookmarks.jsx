import { useEffect, useState } from "react";
import { FaFileCsv, FaFilePdf, FaArrowUp } from "react-icons/fa";
import ThemedInput from "../../Components/Common/ThemedInput";
import RecruiterButton from "../../Components/Common/RecruiterButton";
import SendInvitationButton from "../../Components/Recruiter/SendInvitationButton";
import {
  getBookmarks,
  updateBookmarkNotes,
  removeBookmark,
  exportBookmarksCSV,
  exportBookmarksPDF,
} from "../../services/bookmarkService";
import { sendInvitation } from "../../services/invitationService";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState({}); // {bookmarkId: "notes text"}
  const [invitationModal, setInvitationModal] = useState(null); // candidateId
  const [invitationData, setInvitationData] = useState({
    jobTitle: "",
    message: "",
  });

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const { data } = await getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error("Error fetching bookmarks", err);
    }
    setLoading(false);
  };

  const handleUpdateNotes = async (bookmarkId) => {
    try {
      await updateBookmarkNotes(bookmarkId, editingNotes[bookmarkId]);
      fetchBookmarks();
    } catch (err) {
      console.error("Failed to update notes", err);
    }
  };

  const handleRemove = async (bookmarkId) => {
    try {
      await removeBookmark(bookmarkId);
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    } catch (err) {
      console.error("Failed to remove bookmark", err);
    }
  };

  // Save notes with Enter; allow Shift+Enter for newline
  const onNotesKeyDown = (bookmarkId) => (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdateNotes(bookmarkId);
    }
  };

  const handleExport = async (type) => {
    try {
      const api = type === "csv" ? exportBookmarksCSV : exportBookmarksPDF;
      const response = await api();

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = type === "csv" ? "bookmarks.csv" : "bookmarks.pdf";
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const handleSendInvitation = async () => {
    try {
      await sendInvitation(invitationModal, invitationData);
      alert("Invitation sent successfully!");
      setInvitationModal(null);
      setInvitationData({ jobTitle: "", message: "" });
    } catch (err) {
      console.error("Failed to send invitation", err);
    }
  };

  if (loading) return <p>Loading bookmarks...</p>;

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Bookmarked Candidates</h1>
        <div className="flex flex-wrap gap-2 max-w-full">
          <RecruiterButton
            onClick={() => handleExport("csv")}
            variant="solid"
            aria-label="Export CSV"
            title="Export CSV"
          >
            <span className="flex items-center gap-1">
              <FaFileCsv size={18} />
              <FaArrowUp size={14} className="text-amber-400" />
            </span>
          </RecruiterButton>
          <RecruiterButton
            onClick={() => handleExport("pdf")}
            variant="solid"
            aria-label="Export PDF"
            title="Export PDF"
          >
            <span className="flex items-center gap-1">
              <FaFilePdf size={18} />
              <FaArrowUp size={14} className="text-amber-400" />
            </span>
          </RecruiterButton>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-gray-300">No candidates bookmarked yet.</p>
      ) : (
        bookmarks.map((b, idx) => (
          <div
            key={b._id || b.candidateId?._id || idx}
            className="w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20 p-4 sm:p-5 overflow-hidden"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                  {b.candidateId.fullName} — {b.candidateId.headline}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 break-words">
                  📍 {b.candidateId.location || "N/A"} | ✉️ {" "}
                  <span className="break-all">{b.candidateId.email || "N/A"}</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.isArray(b.candidateId.skills) && b.candidateId.skills.length > 0 ? (
                    b.candidateId.skills.slice(0, 10).map((skill, i) => (
                      <span
                        key={`${skill}-${i}`}
                        className="px-2 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs text-white/90 break-words"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-300">No skills</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <RecruiterButton onClick={() => handleRemove(b._id)} variant="glass">
                  Remove
                </RecruiterButton>
                <SendInvitationButton onClick={() => setInvitationModal(b.candidateId._id)} />
              </div>
            </div>

            <div className="mt-3 sm:mt-4">
              <ThemedInput
                type="textarea"
                label="Notes"
                name={`notes-${b._id}`}
                value={editingNotes[b._id] ?? b.notes ?? ""}
                onChange={(e) =>
                  setEditingNotes({ ...editingNotes, [b._id]: e.target.value })
                }
                onKeyDown={onNotesKeyDown(b._id)}
              />
              <div className="mt-2 sm:mt-3 lg:hidden">
                <RecruiterButton onClick={() => handleUpdateNotes(b._id)} variant="solid">
                  Save Notes
                </RecruiterButton>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Invitation Modal */}
      {invitationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-white">Send Invitation</h2>

            <div className="mb-3">
              <ThemedInput
                label="Job Title"
                name="jobTitle"
                value={invitationData.jobTitle}
                onChange={(e) =>
                  setInvitationData({
                    ...invitationData,
                    jobTitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <ThemedInput
                type="textarea"
                label="Message"
                name="message"
                value={invitationData.message}
                onChange={(e) =>
                  setInvitationData({
                    ...invitationData,
                    message: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <RecruiterButton variant="glass" onClick={() => setInvitationModal(null)}>
                Cancel
              </RecruiterButton>
              <RecruiterButton variant="solid" onClick={handleSendInvitation}>
                Send
              </RecruiterButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
