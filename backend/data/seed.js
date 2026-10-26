import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { defaultData } from './defaultData.js';
import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';
import { Project } from '../models/Project.js';
import { House } from '../models/House.js';
import { Advantage } from '../models/Advantage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('No MONGO_URI found in .env file!');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✓ Connected to MongoDB successfully.');

    console.log('Clearing old collections...');
    await Hero.deleteMany({});
    await About.deleteMany({});
    await Project.deleteMany({});
    await House.deleteMany({});
    await Advantage.deleteMany({});

    console.log('Populating initial data...');
    await Hero.create(defaultData.hero);
    await About.create(defaultData.about);
    await Project.insertMany(defaultData.projects);
    await House.insertMany(defaultData.houses);
    await Advantage.insertMany(defaultData.advantages);

    console.log('====================================================');
    console.log('✓ SUCCESS: Database seeded with all initial data!');
    console.log('  - Hero Section (MODULAR CONSTRUCTION IS OUR...)');
    console.log('  - About Section (100+ Completed, 23 Professionals, 15 Years)');
    console.log('  - 3 Projects (Project #43, #44, #45)');
    console.log('  - 3 House Models (Model S, Model M, Model L)');
    console.log('  - 3 Advantages (Rapid Construction, Build Anywhere, Insulation)');
    console.log('====================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
