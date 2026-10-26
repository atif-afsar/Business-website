import { getStore, saveStore } from '../data/store.js';
import { Quote } from '../models/Quote.js';
import { getIsMongoConnected } from '../config/db.js';

export const createQuote = async (req, res) => {
  try {
    const quoteData = req.body;

    if (getIsMongoConnected()) {
      const created = await Quote.create(quoteData);
      return res.status(201).json({ success: true, message: 'Quote submitted', data: created });
    }

    const store = getStore();
    const newQuote = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      status: 'pending_review',
      ...quoteData
    };
    if (!store.quotes) store.quotes = [];
    store.quotes.unshift(newQuote);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Quote submitted', data: newQuote });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getQuotes = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      const list = await Quote.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: list.length, data: list });
    }

    const store = getStore();
    return res.status(200).json({ success: true, count: (store.quotes || []).length, data: store.quotes || [] });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsMongoConnected()) {
      const updated = await Quote.findByIdAndUpdate(id, { status }, { new: true });
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getStore();
    const index = (store.quotes || []).findIndex((q) => String(q.id) === String(id));
    if (index !== -1) {
      store.quotes[index].status = status;
      saveStore(store);
      return res.status(200).json({ success: true, data: store.quotes[index] });
    }

    res.status(404).json({ success: false, message: 'Quote not found' });
  } catch (error) {
    console.error('Error updating quote status:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
