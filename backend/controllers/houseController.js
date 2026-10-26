import { getStore, saveStore } from '../data/store.js';
import { House } from '../models/House.js';
import { getIsMongoConnected } from '../config/db.js';

export const getHouses = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let houses = await House.find({ isPublished: true }).sort({ order: 1 });
      if (houses.length === 0) {
        const store = getStore();
        await House.insertMany(store.houses);
        houses = await House.find({ isPublished: true });
      }
      return res.status(200).json({ success: true, count: houses.length, data: houses });
    }

    const store = getStore();
    return res.status(200).json({ success: true, count: store.houses.length, data: store.houses });
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getHouseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      const house = await House.findById(id);
      if (!house) return res.status(404).json({ success: false, message: 'Model not found' });
      return res.status(200).json({ success: true, data: house });
    }

    const store = getStore();
    const house = store.houses.find((h) => String(h.id) === String(id));
    if (!house) return res.status(404).json({ success: false, message: 'Model not found' });
    return res.status(200).json({ success: true, data: house });
  } catch (error) {
    console.error('Error fetching house by id:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const createHouse = async (req, res) => {
  try {
    const newHouseData = req.body;

    if (getIsMongoConnected()) {
      const created = await House.create(newHouseData);
      return res.status(201).json({ success: true, message: 'Model created', data: created });
    }

    const store = getStore();
    const newHouse = {
      id: newHouseData.name ? newHouseData.name.toLowerCase().replace(/\s+/g, '-') : String(Date.now()),
      ...newHouseData
    };
    store.houses.push(newHouse);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Model created', data: newHouse });
  } catch (error) {
    console.error('Error creating house:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (getIsMongoConnected()) {
      const updated = await House.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Model not found' });
      return res.status(200).json({ success: true, message: 'Model updated', data: updated });
    }

    const store = getStore();
    const index = store.houses.findIndex((h) => String(h.id) === String(id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Model not found' });

    store.houses[index] = { ...store.houses[index], ...updateData };
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Model updated', data: store.houses[index] });
  } catch (error) {
    console.error('Error updating house:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      await House.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Model deleted' });
    }

    const store = getStore();
    store.houses = store.houses.filter((h) => String(h.id) !== String(id));
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Model deleted' });
  } catch (error) {
    console.error('Error deleting house:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
