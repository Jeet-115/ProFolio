import User from "../models/user.js";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

// 📌 Add candidate to bookmarks
export const addBookmark = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params; // candidateId
  const { notes } = req.body;

  const candidate = await User.findById(id);
  if (!candidate || candidate.role !== "user") {
    return res.status(404).json({ error: "Candidate not found" });
  }

  const recruiter = await User.findById(req.user._id);

  const already = recruiter.bookmarkedCandidates.find(
    (b) => b.candidateId.toString() === id
  );
  if (already) {
    return res.status(400).json({ error: "Candidate already bookmarked" });
  }

  recruiter.bookmarkedCandidates.push({
    candidateId: id,
    notes: notes || "",
    bookmarkedAt: new Date(),
  });

  await recruiter.save();
  res.json({ message: "Candidate bookmarked successfully" });
};

// 📖 Get all bookmarks for recruiter
export const getBookmarks = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id).populate({
    path: "bookmarkedCandidates.candidateId",
    select: "fullName headline skills location profilePicture email",
  });

  res.json(recruiter.bookmarkedCandidates);
};

// 📝 Update notes for a bookmark
export const updateBookmarkNotes = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { bookmarkId } = req.params;
  const { notes } = req.body;

  const recruiter = await User.findById(req.user._id);
  const bookmark = recruiter.bookmarkedCandidates.id(bookmarkId);

  if (!bookmark) {
    return res.status(404).json({ error: "Bookmark not found" });
  }

  bookmark.notes = notes;
  await recruiter.save();

  res.json({ message: "Notes updated successfully" });
};

// ❌ Remove bookmark
export const removeBookmark = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { bookmarkId } = req.params;

  const recruiter = await User.findById(req.user._id);
  const bookmark = recruiter.bookmarkedCandidates.id(bookmarkId);

  if (!bookmark) {
    return res.status(404).json({ error: "Bookmark not found" });
  }

  bookmark.deleteOne();      // ✅ replace .remove()
  await recruiter.save();

  res.json({ message: "Bookmark removed successfully" });
};


// 📤 Export bookmarks as CSV
export const exportBookmarksCSV = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id).populate({
    path: "bookmarkedCandidates.candidateId",
    select: "fullName headline skills location email",
  });

  const data = recruiter.bookmarkedCandidates.map((b) => ({
    Name: b.candidateId.fullName,
    Headline: b.candidateId.headline,
    Skills: b.candidateId.skills.join(", "),
    Location: b.candidateId.location,
    Email: b.candidateId.email,
    Notes: b.notes,
    BookmarkedAt: b.bookmarkedAt,
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("bookmarks.csv");
  return res.send(csv);
};

// 📤 Export bookmarks as PDF
export const exportBookmarksPDF = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recruiter = await User.findById(req.user._id).populate({
    path: "bookmarkedCandidates.candidateId",
    select: "fullName headline skills location email",
  });

  const doc = new PDFDocument();
  const stream = new Readable().wrap(doc);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=bookmarks.pdf");

  doc.fontSize(18).text("Shortlisted Candidates", { align: "center" }).moveDown();

  recruiter.bookmarkedCandidates.forEach((b, i) => {
    doc
      .fontSize(14)
      .text(`${i + 1}. ${b.candidateId.fullName} (${b.candidateId.headline})`)
      .fontSize(12)
      .text(`📍 Location: ${b.candidateId.location || "N/A"}`)
      .text(`📧 Email: ${b.candidateId.email || "N/A"}`)
      .text(`💡 Skills: ${b.candidateId.skills?.join(", ") || "N/A"}`)
      .text(`📝 Notes: ${b.notes || "None"}`)
      .moveDown();
  });

  doc.end();
  doc.pipe(res);
};
