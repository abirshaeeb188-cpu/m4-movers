import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import generateToken from '../utils/generatetoken.js';

async function register(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: 'Name, email, password and confirm password are required.',
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.',
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password and Confirm Password do not match.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [
      normalizedEmail,
    ]);

    if (existing.rows.length > 0) {
      return res.status(409).json({
        message: 'An account with this email already exists.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), normalizedEmail, hashedPassword],
    );

    const user = result.rows[0];

    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        avatar: user.avatar || null,
      },
      message: 'User Register Successfully.....',
    });
  } catch (err) {
    console.error('Register error:', err);

    return res.status(500).json({
      message: 'Something went wrong while creating your account.',
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      normalizedEmail,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        avatar: user.avatar || null,
      },
      message: 'login Successfully...',
    });
  } catch (err) {
    console.error('Login error:', err);

    return res.status(500).json({
      message: 'Something went wrong while logging in.',
    });
  }
}

async function getMe(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, name, email, created_at, avatar FROM users WHERE id = $1',
      [req.user.id],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    return res.json({ user });
  } catch (err) {
    console.error('Get me error:', err);

    return res.status(500).json({
      message: 'Something went wrong.',
    });
  }
}

// POST /api/auth/avatar  (protected)
async function updateAvatar(req, res) {
  try {
    const { avatar } = req.body;

    if (!avatar || typeof avatar !== 'string') {
      return res.status(400).json({ message: 'An image is required.' });
    }

    if (!avatar.startsWith('data:image/')) {
      return res.status(400).json({ message: 'Only image files are allowed.' });
    }

    // Rough size guard: base64 is ~1.37x the original byte size.
    // ~2MB original file -> roughly this many base64 characters.
    const approxSizeMb = (avatar.length * 3) / 4 / (1024 * 1024);
    if (approxSizeMb > 2.5) {
      return res.status(400).json({ message: 'Image is too large. Please use an image under 2MB.' });
    }

    const result = await pool.query(
      `UPDATE users SET avatar = $1 WHERE id = $2
       RETURNING id, name, email, created_at, avatar`,
      [avatar, req.user.id],
    );

    const user = result.rows[0];

    return res.json({ user, message: 'Profile picture updated.' });
  } catch (err) {
    console.error('Update avatar error:', err);

    return res.status(500).json({
      message: 'Something went wrong while updating your profile picture.',
    });
  }
}

export { register, login, getMe, updateAvatar };
