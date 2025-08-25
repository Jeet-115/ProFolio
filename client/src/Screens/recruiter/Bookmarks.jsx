import { useEffect, useState } from "react";
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bookmarked Candidates</h1>
        <div className="space-x-2">
          <button
            onClick={() => handleExport("csv")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No candidates bookmarked yet.</p>
      ) : (
        bookmarks.map((b, idx) => (
          <div
            key={b._id || b.candidateId?._id || idx}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {b.candidateId.fullName} — {b.candidateId.headline}
                </h2>
                <p className="text-sm text-gray-600">
                  📍 {b.candidateId.location || "N/A"} | ✉️{" "}
                  {b.candidateId.email || "N/A"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  💡 Skills: {b.candidateId.skills?.join(", ") || "N/A"}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleRemove(b._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
                <button
                  onClick={() => setInvitationModal(b.candidateId._id)}
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Send Invitation
                </button>
              </div>
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Add notes..."
                value={editingNotes[b._id] ?? b.notes}
                onChange={(e) =>
                  setEditingNotes({ ...editingNotes, [b._id]: e.target.value })
                }
                className="w-full p-2 border rounded resize-none"
              />
              <button
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleUpdateNotes(b._id)}
              >
                Save Notes
              </button>
            </div>
          </div>
        ))
      )}

      {/* Invitation Modal */}
      {invitationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Send Invitation</h2>

            <input
              type="text"
              placeholder="Job Title"
              value={invitationData.jobTitle}
              onChange={(e) =>
                setInvitationData({
                  ...invitationData,
                  jobTitle: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <textarea
              placeholder="Message"
              value={invitationData.message}
              onChange={(e) =>
                setInvitationData({
                  ...invitationData,
                  message: e.target.value,
                })
              }
              className="w-full p-2 border rounded resize-none mb-3"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setInvitationModal(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvitation}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
