import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { getIsMongoConnected } from '../config/db.js';

const generateToken = (id, email, role) => {
  const secret = process.env.JWT_SECRET || 'mod7_jwt_secret_dev_key_2026';
  return jwt.sign({ id, email, role }, secret, {
    expiresIn: '7d'
  });
};

// Ensure default admin user exists
export const ensureAdminExists = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@mod-7.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (getIsMongoConnected()) {
      const existing = await User.findOne({ email: adminEmail });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        await User.create({
          name: 'MOD-7 Lead Administrator',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin'
        });
        console.log(`✓ Default Admin initialized: ${adminEmail}`);
      }
    }
  } catch (err) {
    console.error('Error initializing admin user:', err.message);
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@mod-7.com').toLowerCase();
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (getIsMongoConnected()) {
      let user = await User.findOne({ email: cleanEmail });

      // If database was empty and user entered default admin credentials, create it on the fly!
      if (!user && cleanEmail === defaultEmail) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);
        user = await User.create({
          name: 'MOD-7 Administrator',
          email: defaultEmail,
          password: hashedPassword,
          role: 'admin'
        });
      }

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.email, user.role);
        return res.status(200).json({
          success: true,
          message: 'Admin authentication successful',
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Fallback authentication if MongoDB is offline
    if (cleanEmail === defaultEmail && password === defaultPassword) {
      const token = generateToken('fallback-admin-id', defaultEmail, 'admin');
      return res.status(200).json({
        success: true,
        message: 'Admin authentication successful (fallback mode)',
        token,
        user: {
          id: 'fallback-admin-id',
          name: 'MOD-7 Administrator',
          email: defaultEmail,
          role: 'admin'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error during authentication',
      error: error.message
    });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
