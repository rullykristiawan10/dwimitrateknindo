const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../server/.env') });
dotenv.config();

const { initDB } = require('../../server/db');
const app = require('../../server/server');

let isDbInitialized = false;

module.exports = async (req, res) => {
  if (!isDbInitialized) {
    try {
      await initDB();
      isDbInitialized = true;
    } catch (err) {
      console.error('Error initializing database in serverless function:', err);
    }
  }
  return app(req, res);
};
