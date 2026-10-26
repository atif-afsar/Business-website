import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mod7_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Allow sufficient time for Atlas TLS handshake
    });
    isMongoConnected = true;
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`! MongoDB Connection Notice: Could not connect to ${uri}`);
    console.warn(`! Running with local file-backed JSON store fallback so the server works immediately.`);
    console.warn(`! To use MongoDB: Start MongoDB locally or add your MongoDB Atlas URI in backend/.env`);
  }
};

export const getIsMongoConnected = () => isMongoConnected;
