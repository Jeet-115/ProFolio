import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ProFolio-Resumes",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});

const profilePictureStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ProFolio-ProfilePictures",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  },
});

const upload = multer({ storage });
const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;
export { uploadProfilePicture };
