import express from 'express';
import {
  insertImage,
  getImage,
  getImages,
  cacheConfiguration,
} from '../controllers/index.js';
import { LRUCache, RandomCache } from '../utils/cache/index.js';
import { saveConfiguratuin } from '../database/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('The server is running...');
});

let cache = new LRUCache(10);

router.post('/cache-configure', async (req, res, next) => {
  const { capacity, replacePolicy, clearCache } = req.body;

  const cacheCapacity = capacity.replace('mb', '');
  cache.capacity = cacheCapacity;

  if (replacePolicy === 'random') {
    cache = new RandomCache(cacheCapacity);
  }

  if (clearCache) {
    cache.clear();
  }

  try {
    await saveConfiguratuin({ cacheCapacity, replacePolicy, clearCache });
  } catch (error) {
    return next(error);
  }
});

router.post('/insert-img', insertImage);
router.get('/get-image', getImage);
router.get('/get-images', getImages);

export default router;
export { cache };
