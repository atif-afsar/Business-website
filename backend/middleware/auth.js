import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { getIsMongoConnected } from '../config/db.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this resource. Please log in as admin.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'mod7_jwt_secret_dev_key_2026';
    const decoded = jwt.verify(token, secret);

    if (getIsMongoConnected()) {
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Fallback verify for dev / file store
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'admin'
    };
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.'
    });
  }
};
