import express from 'express';
import {
  createQuote,
  getQuotes,
  updateQuoteStatus
} from '../controllers/quoteController.js';

const router = express.Router();

router.post('/', createQuote);
router.get('/', getQuotes);
router.patch('/:id/status', updateQuoteStatus);

export default router;
