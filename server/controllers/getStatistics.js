import { getStatisticsQuery } from '../database/index.js';

const getStatistics = async (req, res, next) => {
  try {
    const { rows } = await getStatisticsQuery();
    return res.status(200).json(rows);
  } catch (error) {
    return next(error);
  }
};

export default getStatistics;
