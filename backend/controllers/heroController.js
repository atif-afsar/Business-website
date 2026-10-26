import { getStore, updateSection } from '../data/store.js';
import { Hero } from '../models/Hero.js';
import { getIsMongoConnected } from '../config/db.js';

// GET Hero Section Data
export const getHero = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let hero = await Hero.findOne();
      if (!hero) {
        const store = getStore();
        hero = await Hero.create(store.hero);
      }
      return res.status(200).json({ success: true, data: hero });
    }

    // JSON file fallback
    const store = getStore();
    return res.status(200).json({ success: true, data: store.hero });
  } catch (error) {
    console.error('Error fetching hero data:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// UPDATE Hero Section Data (Text, Buttons, Image URL)
export const updateHero = async (req, res) => {
  try {
    const updateData = req.body;

    if (getIsMongoConnected()) {
      let hero = await Hero.findOne();
      if (!hero) {
        hero = new Hero(updateData);
      } else {
        Object.assign(hero, updateData);
      }
      await hero.save();
      updateSection('hero', hero.toObject());
      return res.status(200).json({ success: true, message: 'Hero section updated', data: hero });
    }

    // JSON file fallback
    const updated = updateSection('hero', updateData);
    return res.status(200).json({ success: true, message: 'Hero section updated', data: updated });
  } catch (error) {
    console.error('Error updating hero data:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// UPLOAD & UPDATE Hero Image
export const uploadHeroImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const updated = updateSection('hero', { image: imageUrl });

    if (getIsMongoConnected()) {
      await Hero.findOneAndUpdate({}, { image: imageUrl }, { upsert: true });
    }

    return res.status(200).json({
      success: true,
      message: 'Hero image uploaded and updated successfully',
      imageUrl,
      hero: updated
    });
  } catch (error) {
    console.error('Error uploading hero image:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
