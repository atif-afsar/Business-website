import { getStore, saveStore } from '../data/store.js';
import { Project } from '../models/Project.js';
import { getIsMongoConnected } from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let projects = await Project.find({ isPublished: true }).sort({ order: 1 });
      if (projects.length === 0) {
        const store = getStore();
        await Project.insertMany(store.projects);
        projects = await Project.find({ isPublished: true });
      }
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }

    const store = getStore();
    return res.status(200).json({ success: true, count: store.projects.length, data: store.projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }

    const store = getStore();
    const project = store.projects.find((p) => String(p.id) === String(id));
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project by id:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProjectData = req.body;

    if (getIsMongoConnected()) {
      const created = await Project.create(newProjectData);
      return res.status(201).json({ success: true, message: 'Project created', data: created });
    }

    const store = getStore();
    const newProject = {
      id: String(Date.now()),
      ...newProjectData
    };
    store.projects.push(newProject);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Project created', data: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (getIsMongoConnected()) {
      const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, message: 'Project updated', data: updated });
    }

    const store = getStore();
    const index = store.projects.findIndex((p) => String(p.id) === String(id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Project not found' });

    store.projects[index] = { ...store.projects[index], ...updateData };
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Project updated', data: store.projects[index] });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Project deleted' });
    }

    const store = getStore();
    store.projects = store.projects.filter((p) => String(p.id) !== String(id));
    saveStore(store);

    return res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
