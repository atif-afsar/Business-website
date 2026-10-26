import { getStore, updateSection } from '../data/store.js';
import { Advantage } from '../models/Advantage.js';
import { getIsMongoConnected } from '../config/db.js';

export const getAdvantages = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let advantages = await Advantage.find().sort({ order: 1 });
      if (advantages.length === 0) {
        const store = getStore();
        await Advantage.insertMany(store.advantages);
        advantages = await Advantage.find();
      }
      return res.status(200).json({ success: true, count: advantages.length, data: advantages });
    }

    const store = getStore();
    return res.status(200).json({ success: true, count: store.advantages.length, data: store.advantages });
  } catch (error) {
    console.error('Error fetching advantages:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateAdvantages = async (req, res) => {
  try {
    const newAdvantages = req.body; // Array of advantages

    if (getIsMongoConnected()) {
      await Advantage.deleteMany({});
      const created = await Advantage.insertMany(newAdvantages);
      updateSection('advantages', newAdvantages);
      return res.status(200).json({ success: true, message: 'Advantages updated', data: created });
    }

    const updated = updateSection('advantages', newAdvantages);
    return res.status(200).json({ success: true, message: 'Advantages updated', data: updated });
  } catch (error) {
    console.error('Error updating advantages:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
