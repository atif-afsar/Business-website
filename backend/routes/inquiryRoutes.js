import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus
} from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries);
router.patch('/:id/status', updateInquiryStatus);

export default router;
