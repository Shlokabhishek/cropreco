import { Router, Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import axios from 'axios';

export const router = Router();

// Get market prices for a commodity
router.get('/prices/:commodity', async (req: Request, res: Response) => {
  const { commodity } = req.params;
  const { state, days = 30 } = req.query;

  const db = await getDatabase();
  
  let query = 'SELECT * FROM market_prices WHERE commodity = ?';
  const params: any[] = [commodity];

  if (state) {
    query += ' AND state = ?';
    params.push(state);
  }

  query += ' AND date >= date("now", "-" || ? || " days") ORDER BY date DESC';
  params.push(days);

  const prices = await db.all(query, ...params);

  // If no data in database, try to fetch from external API or return mock data
  if (prices.length === 0) {
    // Generate mock data
    const mockPrices = Array.from({ length: 10 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        commodity,
        price: 2000 + Math.random() * 1000,
        unit: 'per quintal',
        market_name: 'Local Market',
        state: state || 'Maharashtra',
        date: date.toISOString().split('T')[0],
        source: 'mock'
      };
    });

    return res.json({
      prices: mockPrices,
      count: mockPrices.length,
      source: 'mock'
    });
  }

  res.json({
    prices,
    count: prices.length,
    source: 'database'
  });
});

// Get all available commodities
router.get('/commodities', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const commodities = await db.all(
    'SELECT DISTINCT commodity FROM market_prices ORDER BY commodity'
  );

  res.json({
    commodities: commodities.map(c => c.commodity),
    count: commodities.length
  });
});

// Add market price (admin endpoint - should be protected in production)
router.post('/prices', async (req: Request, res: Response) => {
  const { commodity, price, unit, marketName, state, date, source } = req.body;

  if (!commodity || !price) {
    throw new AppError('Commodity and price are required', 400);
  }

  const db = await getDatabase();
  const result = await db.run(
    'INSERT INTO market_prices (commodity, price, unit, market_name, state, date, source) VALUES (?, ?, ?, ?, ?, ?, ?)',
    commodity,
    price,
    unit || 'per quintal',
    marketName,
    state,
    date || new Date().toISOString().split('T')[0],
    source || 'manual'
  );

  res.status(201).json({
    message: 'Price added successfully',
    id: result.lastID
  });
});

// Get market trends (price trends over time)
router.get('/trends', async (req: Request, res: Response) => {
  const { commodities, days = 30 } = req.query;

  if (!commodities) {
    throw new AppError('Commodities parameter required', 400);
  }

  const commodityList = (commodities as string).split(',');
  const db = await getDatabase();

  const trends = await Promise.all(
    commodityList.map(async (commodity) => {
      const prices = await db.all(
        'SELECT date, AVG(price) as avg_price FROM market_prices WHERE commodity = ? AND date >= date("now", "-" || ? || " days") GROUP BY date ORDER BY date',
        commodity.trim(),
        days
      );

      return {
        commodity: commodity.trim(),
        data: prices,
        averagePrice: prices.length > 0 
          ? prices.reduce((sum, p) => sum + p.avg_price, 0) / prices.length 
          : 0
      };
    })
  );

  res.json({ trends });
});

// Get price comparison across states
router.get('/comparison/:commodity', async (req: Request, res: Response) => {
  const { commodity } = req.params;
  const { date } = req.query;

  const db = await getDatabase();
  
  let query = `
    SELECT state, AVG(price) as avg_price, COUNT(*) as count
    FROM market_prices 
    WHERE commodity = ?
  `;
  const params: any[] = [commodity];

  if (date) {
    query += ' AND date = ?';
    params.push(date);
  } else {
    query += ' AND date >= date("now", "-7 days")';
  }

  query += ' GROUP BY state ORDER BY avg_price DESC';

  const comparison = await db.all(query, ...params);

  res.json({
    commodity,
    comparison,
    count: comparison.length
  });
});
