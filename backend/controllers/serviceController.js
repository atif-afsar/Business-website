import { getStore, saveStore } from '../data/store.js';
import { Service } from '../models/Service.js';
import { getIsMongoConnected } from '../config/db.js';
import { defaultData } from '../data/defaultData.js';

// GET /api/services (Public)
export const getServices = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let services = await Service.find({ isActive: true }).sort({ order: 1 });
      if (services.length === 0) {
        await Service.insertMany(defaultData.services);
        services = await Service.find({ isActive: true }).sort({ order: 1 });
      }
      return res.status(200).json({ success: true, count: services.length, data: services });
    }

    const store = getStore();
    const services = store.services || defaultData.services;
    return res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /api/services (Admin protected)
export const createService = async (req, res) => {
  try {
    const { number, title, subtitle, description, tags, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const formattedTags = Array.isArray(tags) 
      ? tags 
      : (typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : []);

    if (getIsMongoConnected()) {
      const created = await Service.create({
        number: number || '01',
        title,
        subtitle: subtitle || '',
        description,
        tags: formattedTags,
        order: Number(order) || 0,
        isActive: true
      });
      return res.status(201).json({ success: true, message: 'Service created successfully', data: created });
    }

    const store = getStore();
    if (!store.services) store.services = [...defaultData.services];
    const newService = {
      id: `srv-${Date.now()}`,
      number: number || `0${store.services.length + 1}`,
      title,
      subtitle: subtitle || '',
      description,
      tags: formattedTags,
      order: Number(order) || store.services.length + 1,
      isActive: true
    };
    store.services.push(newService);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Service created successfully', data: newService });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// PUT /api/services/:id (Admin protected)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, title, subtitle, description, tags, order, isActive } = req.body;

    const formattedTags = Array.isArray(tags) 
      ? tags 
      : (typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined);

    const updateFields = {};
    if (number !== undefined) updateFields.number = number;
    if (title !== undefined) updateFields.title = title;
    if (subtitle !== undefined) updateFields.subtitle = subtitle;
    if (description !== undefined) updateFields.description = description;
    if (formattedTags !== undefined) updateFields.tags = formattedTags;
    if (order !== undefined) updateFields.order = Number(order);
    if (isActive !== undefined) updateFields.isActive = isActive;

    if (getIsMongoConnected()) {
      // Find by _id or fallback string id
      let updated = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updated = await Service.findByIdAndUpdate(id, updateFields, { new: true });
      } else {
        updated = await Service.findOneAndUpdate({ number: id }, updateFields, { new: true });
      }

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.status(200).json({ success: true, message: 'Service updated successfully', data: updated });
    }

    const store = getStore();
    if (!store.services) store.services = [...defaultData.services];
    const index = store.services.findIndex((s) => String(s.id) === String(id) || String(s.number) === String(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    store.services[index] = { ...store.services[index], ...updateFields };
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Service updated successfully', data: store.services[index] });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// DELETE /api/services/:id (Admin protected)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      let deleted = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        deleted = await Service.findByIdAndDelete(id);
      } else {
        deleted = await Service.findOneAndDelete({ number: id });
      }
      return res.status(200).json({ success: true, message: 'Service deleted successfully' });
    }

    const store = getStore();
    if (!store.services) store.services = [...defaultData.services];
    store.services = store.services.filter((s) => String(s.id) !== String(id) && String(s.number) !== String(id));
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /api/services/reset (Admin protected: reset to default services)
export const resetServices = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      await Service.deleteMany({});
      const seeded = await Service.insertMany(defaultData.services);
      return res.status(200).json({ success: true, message: 'Services reset to default', data: seeded });
    }

    const store = getStore();
    store.services = [...defaultData.services];
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Services reset to default', data: store.services });
  } catch (error) {
    console.error('Error resetting services:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
