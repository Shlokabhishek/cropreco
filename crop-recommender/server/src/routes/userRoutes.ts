import { Router, Response } from 'express';
import { getDatabase } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest } from '../middleware/auth';

export const router = Router();

// Get user profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  const db = await getDatabase();
  
  const user = await db.get(
    'SELECT id, email, name, created_at FROM users WHERE id = ?',
    req.userId
  );

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const farmerProfile = await db.get(
    'SELECT * FROM farmer_profiles WHERE user_id = ?',
    req.userId
  );

  res.json({
    user,
    farmerProfile
  });
});

// Create or update farmer profile
router.post('/profile/farmer', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { state, district, acreage, soilType, budget, phone } = req.body;

  if (!state || !acreage || !soilType) {
    throw new AppError('State, acreage, and soilType are required', 400);
  }

  const db = await getDatabase();

  // Check if profile exists
  const existing = await db.get(
    'SELECT id FROM farmer_profiles WHERE user_id = ?',
    req.userId
  );

  if (existing) {
    // Update
    await db.run(
      `UPDATE farmer_profiles 
       SET state = ?, district = ?, acreage = ?, soil_type = ?, budget = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      state, district, acreage, soilType, budget, phone, req.userId
    );

    res.json({ message: 'Profile updated successfully' });
  } else {
    // Create
    await db.run(
      'INSERT INTO farmer_profiles (user_id, state, district, acreage, soil_type, budget, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
      req.userId, state, district, acreage, soilType, budget, phone
    );

    res.status(201).json({ message: 'Profile created successfully' });
  }
});

// Get crop history
router.get('/history/crops', authenticateToken, async (req: AuthRequest, res: Response) => {
  const db = await getDatabase();
  
  const history = await db.all(
    'SELECT * FROM crop_history WHERE user_id = ? ORDER BY year DESC, created_at DESC',
    req.userId
  );

  res.json({
    history,
    count: history.length
  });
});

// Add crop history entry
router.post('/history/crops', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { cropName, season, year, yieldActual, revenue, notes } = req.body;

  if (!cropName || !season || !year) {
    throw new AppError('Crop name, season, and year are required', 400);
  }

  const db = await getDatabase();
  const result = await db.run(
    'INSERT INTO crop_history (user_id, crop_name, season, year, yield_actual, revenue, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
    req.userId, cropName, season, year, yieldActual, revenue, notes
  );

  res.status(201).json({
    message: 'Crop history added successfully',
    id: result.lastID
  });
});

// Delete crop history entry
router.delete('/history/crops/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const db = await getDatabase();

  const result = await db.run(
    'DELETE FROM crop_history WHERE id = ? AND user_id = ?',
    id, req.userId
  );

  if (result.changes === 0) {
    throw new AppError('History entry not found', 404);
  }

  res.json({ message: 'Crop history deleted successfully' });
});
