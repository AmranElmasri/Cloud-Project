import { getImagesQuery } from '../database/index.js';

const getImages = async (req, res, next) => {
  try {
    const { rows, rowCount } = await getImagesQuery();
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Images not found' });
    }
    return res.status(200).json(rows);
  } catch (error) {
    return next(error);
  }
};
export default getImages;