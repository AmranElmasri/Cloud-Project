import { checkKeyQuery, getImageQuery } from '../database/index.js';
import { cache } from '../routes/index.js';
import cookie from "cookies";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getImage = async (req, res, next) => {

  const { key } = req.query;
  const cookies = new cookie(req, res);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);  // because __dirname is not defined in ES module scope
  const jsonPath = path.join(__dirname, "..", "utils", "images.json")

  try {
    let hit_rate = cookies.get('hit_rate') ? JSON.parse(cookies.get('hit_rate')) : 0;
    let miss_rate = cookies.get('miss_rate') ? JSON.parse(cookies.get('miss_rate')) : 0;



    if(cache.get(key) !== -1){
      hit_rate = Math.round(100 - (miss_rate / 2));
      miss_rate = Math.round(100 - hit_rate);
      cookies.set('hit_rate', JSON.stringify(hit_rate));
      cookies.set('miss_rate', JSON.stringify(miss_rate));
      return res.status(200).json(cache.get(key));
    }
    
    const {rowCount: oldKey} = await checkKeyQuery(key);
    if (oldKey === 0) {
      return res.status(400).json({ message: 'Key does not exist in our records' });
    } 
    const { rows, rowCount } = await getImageQuery(key);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const image = rows[0];


    const data = fs.readFileSync( jsonPath, 'utf8');
    const obj = JSON.parse(data);

    cache.put(obj[key].key, obj[key].image);

    miss_rate = Math.round(100 - (hit_rate / 2));
    hit_rate = Math.round(100 - miss_rate);
    cookies.set('hit_rate', JSON.stringify(hit_rate));
    cookies.set('miss_rate', JSON.stringify(miss_rate));
    return res.status(200).json(image);

  } catch (error) {
    return next(error);
  }
};

export default getImage;

