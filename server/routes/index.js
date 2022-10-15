import express from 'express';
import {
  insertImage,
  getImage,
  getImages,
  cacheConfiguration,
  insertStatistics,
  getStatistics,
  getConfiguraiton,
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
    res.status(200).json({ message: 'configuration saved successfully' });
  } catch (error) {
    return next(error);
  }
});


router.post('/insert-img', insertImage);
router.get('/get-image', getImage);
router.get('/get-images', getImages);
router.get('/update-statistics', insertStatistics);
router.get('/statistics', getStatistics);
router.get('/getConfiguraiton', getConfiguraiton);


export default router;
export { cache };
