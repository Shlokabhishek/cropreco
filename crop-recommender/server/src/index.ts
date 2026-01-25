import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as cropRoutes } from './routes/cropRoutes';
import { router as weatherRoutes } from './routes/weatherRoutes';
import { router as marketRoutes } from './routes/marketRoutes';
import { router as authRoutes } from './routes/authRoutes';
import { router as userRoutes } from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import { setupDatabase } from './config/database';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/crops', cropRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    await setupDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📊 Database initialized`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
