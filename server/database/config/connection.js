import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, DB_URL_DEV, DB_URL_TEST, DATABASE_URL } = process.env;

let dbUrl;

switch (NODE_ENV) {
  case 'development':
    dbUrl = DB_URL_DEV;
    break;
  case 'test':
    dbUrl = DB_URL_TEST;
    break;
  case 'production':
    dbUrl = DATABASE_URL;
    break;
  default:
    throw new Error('DATABSE_URL is not exist');
}

const connection = new Pool({
  connectionString: dbUrl,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default connection;
