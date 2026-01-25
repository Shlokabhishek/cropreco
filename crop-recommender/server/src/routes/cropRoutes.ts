import { Router, Response } from 'express';
import { getDatabase } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

export const router = Router();

// Get crop recommendations based on parameters
router.post('/recommend', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { state, acreage, soilType, season, rainfall, temperature } = req.body;

  if (!state || !acreage || !soilType) {
    throw new AppError('State, acreage, and soilType are required', 400);
  }

  // Load crop dataset
  const csvPath = path.join(process.cwd(), 'public', 'data', 'crop_dataset.csv');
  const csvContent = await fs.readFile(csvPath, 'utf-8');
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });

  // Filter and score crops
  const recommendations = records
    .filter((crop: any) => {
      if (season && crop.season && crop.season.toLowerCase() !== season.toLowerCase()) {
        return false;
      }
      if (state && crop.state && crop.state.toLowerCase() !== state.toLowerCase()) {
        return false;
      }
      return true;
    })
    .map((crop: any) => {
      let score = 50;
      
      // Adjust score based on rainfall
      if (rainfall && crop.rainfall) {
        const rainfallDiff = Math.abs(parseFloat(crop.rainfall) - parseFloat(rainfall));
        score += Math.max(0, 25 - rainfallDiff / 10);
      }

      // Soil type match
      if (soilType && crop.soilType && crop.soilType.toLowerCase().includes(soilType.toLowerCase())) {
        score += 15;
      }

      // Calculate estimates
      const yieldPerHectare = parseFloat(crop.yieldPerHectare || 0);
      const hectares = acreage * 0.404686; // Convert acres to hectares
      const estimatedYield = yieldPerHectare * hectares;
      const pricePerUnit = parseFloat(crop.price || 0);
      const estimatedRevenue = estimatedYield * pricePerUnit;

      return {
        name: crop.crop || crop.name,
        yield: estimatedYield,
        estimatedRevenue,
        score: Math.min(100, score),
        season: crop.season,
        soilType: crop.soilType,
        yieldPerHectare
      };
    })
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 10);

  // Save recommendation to database
  const db = await getDatabase();
  for (const rec of recommendations.slice(0, 3)) {
    await db.run(
      'INSERT INTO recommendations (user_id, crop_name, score, estimated_yield, estimated_revenue, season, parameters) VALUES (?, ?, ?, ?, ?, ?, ?)',
      req.userId,
      rec.name,
      rec.score,
      rec.yield,
      rec.estimatedRevenue,
      rec.season,
      JSON.stringify({ state, soilType, acreage })
    );
  }

  res.json({
    recommendations,
    count: recommendations.length
  });
});

// Get all crops
router.get('/', async (req: Request, res: Response) => {
  const csvPath = path.join(process.cwd(), 'public', 'data', 'crop_dataset.csv');
  const csvContent = await fs.readFile(csvPath, 'utf-8');
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });

  res.json({
    crops: records,
    count: records.length
  });
});

// Get crop by name
router.get('/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  
  const csvPath = path.join(process.cwd(), 'public', 'data', 'crop_dataset.csv');
  const csvContent = await fs.readFile(csvPath, 'utf-8');
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });

  const crop = records.find((c: any) => 
    c.crop?.toLowerCase() === name.toLowerCase() || 
    c.name?.toLowerCase() === name.toLowerCase()
  );

  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  res.json({ crop });
});

// Get user's recommendation history
router.get('/history/user', authenticateToken, async (req: AuthRequest, res: Response) => {
  const db = await getDatabase();
  const recommendations = await db.all(
    'SELECT * FROM recommendations WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    req.userId
  );

  res.json({
    recommendations,
    count: recommendations.length
  });
});
