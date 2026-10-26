import express from 'express';
import { getAdvantages, updateAdvantages } from '../controllers/advantageController.js';

const router = express.Router();

router.get('/', getAdvantages);
router.put('/', updateAdvantages);

export default router;
