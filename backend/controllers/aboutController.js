import { getStore, updateSection } from '../data/store.js';
import { About } from '../models/About.js';
import { getIsMongoConnected } from '../config/db.js';

export const getAbout = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let about = await About.findOne();
      if (!about) {
        const store = getStore();
        about = await About.create(store.about);
      }
      return res.status(200).json({ success: true, data: about });
    }

    const store = getStore();
    return res.status(200).json({ success: true, data: store.about });
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const updateData = req.body;

    if (getIsMongoConnected()) {
      let about = await About.findOne();
      if (!about) {
        about = new About(updateData);
      } else {
        Object.assign(about, updateData);
      }
      await about.save();
      updateSection('about', about.toObject());
      return res.status(200).json({ success: true, message: 'About section updated', data: about });
    }

    const updated = updateSection('about', updateData);
    return res.status(200).json({ success: true, message: 'About section updated', data: updated });
  } catch (error) {
    console.error('Error updating about data:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
