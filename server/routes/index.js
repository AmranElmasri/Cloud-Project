import express from 'express';
import { insertImage, getImage, getImages } from '../controllers/index.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('The server is running...');
});

router.post('/insert-img', insertImage);
router.get('/get-image', getImage);
router.get('/get-images', getImages);

export default router;
