import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  resetServices
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all active services for website
router.get('/', getServices);

// Admin Protected: CRUD services
router.post('/', protectAdmin, createService);
router.put('/:id', protectAdmin, updateService);
router.delete('/:id', protectAdmin, deleteService);
router.post('/reset', protectAdmin, resetServices);

export default router;
