import express from 'express';
import { insertImage, getImage, getImages } from '../controllers/index.js';
import LRUCache from "../utils/cache/LRUCache.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('The server is running...');
});

const cache = new LRUCache(5);

router.post('/insert-img', insertImage);
router.get('/get-image', getImage);
router.get('/get-images', getImages);

export default router;
export {cache};