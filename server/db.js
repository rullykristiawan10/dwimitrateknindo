require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const DEFAULT_SUPABASE_URL = 'postgresql://postgres:Mitraclimapro456%40@db.gjhlukzgpeuzvgzrudye.supabase.co:5432/postgres';
const connectionString = process.env.DATABASE_URL || DEFAULT_SUPABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id BIGINT PRIMARY KEY,
        image VARCHAR(255),
        badge VARCHAR(100),
        category VARCHAR(100),
        title VARCHAR(255),
        description TEXT,
        popular BOOLEAN DEFAULT false
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id BIGINT PRIMARY KEY,
        image VARCHAR(255),
        date VARCHAR(100),
        category VARCHAR(100),
        title VARCHAR(255),
        description TEXT,
        popular BOOLEAN DEFAULT false
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255),
        size VARCHAR(50),
        type VARCHAR(50),
        file VARCHAR(255)
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id BIGINT PRIMARY KEY,
        image VARCHAR(255),
        title VARCHAR(255),
        description TEXT,
        tags JSONB,
        popular BOOLEAN DEFAULT false
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id BIGINT PRIMARY KEY,
        name VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        service VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255),
        date VARCHAR(100),
        location VARCHAR(255),
        type VARCHAR(100),
        logo VARCHAR(255),
        flag VARCHAR(50)
      )
    `);

    // Check if we need to seed data from data.json
    const res = await client.query('SELECT count(*) FROM projects');
    if (parseInt(res.rows[0].count) === 0) {
      console.log('Database empty, seeding from data.json...');
      const dataFile = path.join(__dirname, 'data.json');
      if (fs.existsSync(dataFile)) {
        const fileContent = fs.readFileSync(dataFile, 'utf8');
        const dbJson = JSON.parse(fileContent);

        if (dbJson.projects && dbJson.projects.length > 0) {
          for (const p of dbJson.projects) {
            await client.query(
              'INSERT INTO projects (id, image, badge, category, title, description, popular) VALUES ($1, $2, $3, $4, $5, $6, $7)',
              [p.id, p.image, p.badge, p.category, p.title, p.description, p.popular || false]
            );
          }
        }

        if (dbJson.articles && dbJson.articles.length > 0) {
          for (const a of dbJson.articles) {
            await client.query(
              'INSERT INTO articles (id, image, date, category, title, description, popular) VALUES ($1, $2, $3, $4, $5, $6, $7)',
              [a.id, a.image, a.date, a.category, a.title, a.description, a.popular || false]
            );
          }
        }

        if (dbJson.documents && dbJson.documents.length > 0) {
          for (const d of dbJson.documents) {
            await client.query(
              'INSERT INTO documents (id, title, size, type, file) VALUES ($1, $2, $3, $4, $5)',
              [d.id, d.title, d.size, d.type, d.file]
            );
          }
        }

        if (dbJson.products && dbJson.products.length > 0) {
          for (const p of dbJson.products) {
            await client.query(
              'INSERT INTO products (id, image, title, description, tags, popular) VALUES ($1, $2, $3, $4, $5, $6)',
              [p.id, p.image, p.title, p.description, JSON.stringify(p.tags || []), p.popular || false]
            );
          }
        }
        console.log('Seeding complete.');
      }
    }

    const eventsRes = await client.query('SELECT count(*) FROM events');
    if (parseInt(eventsRes.rows[0].count) === 0) {
      const dataFile = path.join(__dirname, 'data.json');
      if (fs.existsSync(dataFile)) {
        const fileContent = fs.readFileSync(dataFile, 'utf8');
        const dbJson = JSON.parse(fileContent);
        if (dbJson.events && dbJson.events.length > 0) {
          for (const ev of dbJson.events) {
            await client.query(
              'INSERT INTO events (id, title, date, location, type, logo, flag) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING',
              [ev.id, ev.title, ev.date, ev.location, ev.type, ev.logo, ev.flag]
            );
          }
          console.log('Events seeded.');
        }
      }
    }

    await client.query('COMMIT');
    console.log('Database initialized successfully.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error initializing database', e);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  initDB
};
