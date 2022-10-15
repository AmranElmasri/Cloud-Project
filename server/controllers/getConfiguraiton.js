import { getConfiguraitonQuery } from '../database/index.js';

const getConfiguraiton = async (req, res, next) => {
  try {
    const { rows } = await getConfiguraitonQuery();
    res.status(200).json(rows);
  } catch (error) {
    return next(error);
  }
};

export default getConfiguraiton;
