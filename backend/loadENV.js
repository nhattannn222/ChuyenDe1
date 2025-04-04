// loadEnv.js
require('dotenv').config({ path: './.env' });

module.exports = {
  DB_HOST:process.env.DB_HOST,
  DB_USER:process.env.DB_USER,
  DB_PASSWORD:process.env.DB_PASSWORD,
  DB_PORT:process.env.DB_PORT
};
