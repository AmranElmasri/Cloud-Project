import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { notFoundError, serverError } from './error/index.js';

dotenv.config();

const app = express();

app.use([
  express.json({ limit: '15mb' }),
  express.urlencoded({ extended: false, limit: '15mb' }),
  compression(),
]);
app.use(cors());
app.disable('x-powered-by');

app.set('port', process.env.PORT || 4000);

app.use('/api/v1', router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // because __dirname is not defined in ES module scope


if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.send('The server is running..');
  });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFoundError);
app.use(serverError);
export default app;
