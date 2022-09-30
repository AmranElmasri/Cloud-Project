import { checkKeyQuery, insertImageQuery } from '../database/index.js';

const insertImage = async (req, res, next) => {
  const { key, image } = req.body;
  console.log(key);
  try {
    const { rowCount } = await checkKeyQuery(key);
    if (rowCount !== 0) {
      return res.status(400).json({ message: 'Key already exists' });
    }
    const { rows } = await insertImageQuery(key, image);
    res
      .status(201)
      .json({ data: rows[0], message: ' image added successfully!' });
  } catch (error) {
    return next(error);
  }
};
export default insertImage;
