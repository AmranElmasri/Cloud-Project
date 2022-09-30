import { checkKeyQuery, getImageQuery } from '../database/index.js';

const getImage = async (req, res, next) => {
  const { key } = req.query;

  try {
    const {rowCount: oldKey} = await checkKeyQuery(key);
    if (oldKey === 0) {
      return res.status(400).json({ message: 'Key does not exist in our records' });
    }
    const { rows, rowCount } = await getImageQuery(key);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const image = rows[0];
    return res.status(200).json(image);
  } catch (error) {
    return next(error);
  }
};

export default getImage;
