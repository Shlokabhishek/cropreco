import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs/promises';

let db: Database | null = null;

export async function setupDatabase(): Promise<Database> {
  if (db) return db;

  const dbPath = path.join(process.cwd(), 'server', 'data', 'crop_recommender.db');
  
  // Ensure data directory exists
  await fs.mkdir(path.dirname(dbPath), { recursive: true });

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS farmer_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      state TEXT NOT NULL,
      district TEXT,
      acreage REAL NOT NULL,
      soil_type TEXT NOT NULL,
      budget REAL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS crop_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      crop_name TEXT NOT NULL,
      season TEXT NOT NULL,
      year INTEGER NOT NULL,
      yield_actual REAL,
      revenue REAL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS market_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commodity TEXT NOT NULL,
      price REAL NOT NULL,
      unit TEXT DEFAULT 'per quintal',
      market_name TEXT,
      state TEXT,
      date DATE NOT NULL,
      source TEXT DEFAULT 'government',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      crop_name TEXT NOT NULL,
      score REAL NOT NULL,
      estimated_yield REAL,
      estimated_revenue REAL,
      season TEXT,
      parameters TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_market_prices_commodity ON market_prices(commodity);
    CREATE INDEX IF NOT EXISTS idx_market_prices_date ON market_prices(date);
    CREATE INDEX IF NOT EXISTS idx_crop_history_user ON crop_history(user_id);
    CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
  `);

  console.log('Database tables created/verified');
  return db;
}

export async function getDatabase(): Promise<Database> {
  if (!db) {
    return setupDatabase();
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
