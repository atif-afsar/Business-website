import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// POST /api/upload (Generic image upload for admin panel)
router.post('/', upload.single('image'), uploadFile);

export default router;
