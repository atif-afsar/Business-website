import express from 'express';
import { getHero, updateHero, uploadHeroImage } from '../controllers/heroController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// GET /api/hero
router.get('/', getHero);

// PUT /api/hero
router.put('/', updateHero);

// POST /api/hero/image
router.post('/image', upload.single('image'), uploadHeroImage);

export default router;
