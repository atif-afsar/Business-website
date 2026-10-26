import { getStore, saveStore } from '../data/store.js';
import { Inquiry } from '../models/Inquiry.js';
import { getIsMongoConnected } from '../config/db.js';

export const createInquiry = async (req, res) => {
  try {
    const inquiryData = req.body;

    if (getIsMongoConnected()) {
      const created = await Inquiry.create(inquiryData);
      return res.status(201).json({ success: true, message: 'Inquiry submitted', data: created });
    }

    const store = getStore();
    const newInquiry = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      status: 'new',
      ...inquiryData
    };
    if (!store.inquiries) store.inquiries = [];
    store.inquiries.unshift(newInquiry);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Inquiry submitted', data: newInquiry });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      const list = await Inquiry.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: list.length, data: list });
    }

    const store = getStore();
    return res.status(200).json({ success: true, count: (store.inquiries || []).length, data: store.inquiries || [] });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsMongoConnected()) {
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getStore();
    const index = (store.inquiries || []).findIndex((i) => String(i.id) === String(id));
    if (index !== -1) {
      store.inquiries[index].status = status;
      saveStore(store);
      return res.status(200).json({ success: true, data: store.inquiries[index] });
    }

    res.status(404).json({ success: false, message: 'Inquiry not found' });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
