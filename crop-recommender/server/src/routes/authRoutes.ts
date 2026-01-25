import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getDatabase } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { generateToken } from '../middleware/auth';

export const router = Router();

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new AppError('Email, password, and name are required', 400);
  }

  const db = await getDatabase();
  
  // Check if user exists
  const existingUser = await db.get('SELECT id FROM users WHERE email = ?', email);
  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const result = await db.run(
    'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
    email,
    passwordHash,
    name
  );

  const token = generateToken(result.lastID!);

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: result.lastID,
      email,
      name
    }
  });
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const db = await getDatabase();
  const user = await db.get(
    'SELECT id, email, name, password_hash FROM users WHERE email = ?',
    email
  );

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken(user.id);

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});
