import fs from 'fs';
import path from 'path';
import { defaultData } from './defaultData.js';

const storeFilePath = path.resolve('data/store.json');

// Ensure data folder and file exists
const initStore = () => {
  const dir = path.dirname(storeFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(storeFilePath)) {
    fs.writeFileSync(storeFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
};

initStore();

export const getStore = () => {
  try {
    const raw = fs.readFileSync(storeFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading store.json, returning defaultData', err);
    return defaultData;
  }
};

export const saveStore = (newData) => {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(newData, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to store.json', err);
    return false;
  }
};

export const updateSection = (sectionKey, updateData) => {
  const current = getStore();
  if (Array.isArray(current[sectionKey])) {
    current[sectionKey] = updateData;
  } else if (typeof current[sectionKey] === 'object') {
    current[sectionKey] = { ...current[sectionKey], ...updateData };
  } else {
    current[sectionKey] = updateData;
  }
  saveStore(current);
  return current[sectionKey];
};
