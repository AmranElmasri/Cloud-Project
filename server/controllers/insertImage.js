import {
  checkKeyQuery,
  insertImageQuery,
  getConfiguraitonQuery,
} from '../database/index.js';
import uploadToCloudinary from '../utils/cloudinary/index.js';
import LRUCache from '../utils/cache/LRUCache.js';
import { cache } from '../routes/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const insertImage = async (req, res, next) => {
  const { key, image } = req.body;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);  // because __dirname is not defined in ES module scope
  const jsonPath = path.join(__dirname, "..", "utils", "images.json")

  try {
      fs.readFile(jsonPath, 'UTF8', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const obj = JSON.parse(data);
          obj[key] = req.body;
          fs.writeFile(jsonPath, JSON.stringify(obj), (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });

    const { rowCount } = await checkKeyQuery(key);
    if (rowCount !== 0) {
      return res.status(400).json({ message: 'Key already exists' });
    }
    const { rows: cacheConfig } = await getConfiguraitonQuery();

    console.log("first") 
    // const img_url = await uploadToCloudinary(image);

    cache.capacity = cacheConfig[cacheConfig.length - 1].capacity;
    // cache.put(key, img_url);
    const { rows } = await insertImageQuery(key, image);
    res
      .status(201)
      .json({ data: rows[0], message: 'image added successfully!' });
  } catch (error) {
    return next(error);
  }
};
export default insertImage;
