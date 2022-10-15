import {
  getConfiguraitonQuery,
  getImagesQuery,
  insertStatisticsQuery,
} from '../database/index.js';
import cookie from 'cookies';

const insertStatistics = async (req, res, next) => {
  const cookies = new cookie(req, res);

  try {
    const { rows: cacheCongif } = await getConfiguraitonQuery();
    const { capacity: items_size } = cacheCongif[0];

    const { rows: items } = await getImagesQuery();

    const requests_no = items.length;
    const items_no = items.length;

    let hit_rate = cookies.get('hit_rate')
      ? JSON.parse(cookies.get('hit_rate'))
      : 0;
    let miss_rate = cookies.get('miss_rate')
      ? JSON.parse(cookies.get('miss_rate'))
      : 0;

    const { rows } = await insertStatisticsQuery({
      items_no,
      items_size,
      requests_no,
      miss_rate,
      hit_rate,
    });

    res.status(200).send('success');
  } catch (error) {
    return next(error);
  }
};

export default insertStatistics;
