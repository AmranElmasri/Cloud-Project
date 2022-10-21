import { readFileSync } from 'fs';
import path from 'path';
import connection from './connection.js';
import { fileURLToPath } from 'url';

const buildDb = async () => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);  // because __dirname is not defined in ES module scope
  
  const buildFile = readFileSync(path.join(__dirname, 'build.sql')).toString();
  const fakeDataFile = readFileSync(path.join(__dirname, 'fakeData.sql')).toString();
  try {
    await connection.query(buildFile + fakeDataFile);
  } catch (err) {
    console.log('DB Error: ', err);
  }
};

export default buildDb;
