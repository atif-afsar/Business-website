import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, getIsMongoConnected } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import heroRoutes from './routes/heroRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import houseRoutes from './routes/houseRoutes.js';
import advantageRoutes from './routes/advantageRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { ensureAdminExists } from './controllers/authController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Connect to Database (with automatic fallback to JSON store)
connectDB().then(() => {
  ensureAdminExists();
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

// Static uploads directory (allows serving uploaded hero/project images)
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/advantages', advantageRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/upload', uploadRoutes);


// Health Check & Root API Status
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'MOD-7 Backend & CMS API',
    database: getIsMongoConnected() ? 'MongoDB' : 'Local File Store (Fallback Active)',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to MOD-7 Modular Architecture API',
    endpoints: {
      hero: '/api/hero',
      about: '/api/about',
      projects: '/api/projects',
      houses: '/api/houses',
      advantages: '/api/advantages',
      inquiries: '/api/inquiries',
      quotes: '/api/quotes',
      upload: '/api/upload',
      health: '/api/health'
    }
  });
});

// Central Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 MOD-7 Backend Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`📁 Uploads:  http://localhost:${PORT}/uploads`);
  console.log(`===============================================`);
});

export default app;
