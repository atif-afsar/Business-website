// Centralized API configuration
// When deployed on Vercel, set VITE_API_BASE_URL in your Vercel Project Settings -> Environment Variables.
// Example: https://mod7-backend.onrender.com/api
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
