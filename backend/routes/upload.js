import express from 'express';
import upload from '../middleware/multer.js';
import { uploadImage } from '../controllers/upload.js';

const router = express.Router();

router.post('/image', upload.single('file'), uploadImage);

export default router;
