import { checkKeyQuery, insertImageQuery, getConfiguraitonQuery } from '../database/index.js';
import uploadToCloudinary from '../utils/cloudinary/index.js';
import LRUCache from "../utils/cache/LRUCache.js";
import { cache } from '../routes/index.js';

const insertImage = async (req, res, next) => {
  const { key, image } = req.body;

  
  try {
    const { rowCount } = await checkKeyQuery(key);
    if (rowCount !== 0) {
      return res.status(400).json({ message: 'Key already exists' });
    }
    const { rows:cacheConfig } = await getConfiguraitonQuery();

    const img_url = await uploadToCloudinary(image);

    cache.capacity = cacheConfig[cacheConfig.length-1].capacity;
    cache.put(key, img_url);
    const { rows } = await insertImageQuery(key, img_url);
    res
      .status(201)
      .json({ data: rows[0], message: ' image added successfully!' });
  } catch (error) {
    return next(error);
  }
};
export default insertImage;
