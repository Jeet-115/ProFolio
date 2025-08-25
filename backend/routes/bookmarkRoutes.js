import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as bookmarkController from "../controllers/bookmarkController.js";

const router = express.Router();

// 📌 Bookmarks APIs
router.get("/", wrapAsync(bookmarkController.getBookmarks));
router.post("/:id", wrapAsync(bookmarkController.addBookmark));
router.put("/:bookmarkId", wrapAsync(bookmarkController.updateBookmarkNotes));
router.delete("/:bookmarkId", wrapAsync(bookmarkController.removeBookmark));

// 📤 Export
router.get("/export/csv", wrapAsync(bookmarkController.exportBookmarksCSV));
router.get("/export/pdf", wrapAsync(bookmarkController.exportBookmarksPDF));

export default router;
