import {
  getConfiguraitonQuery,
  getImagesQuery,
  insertStatisticsQuery,
  saveConfiguratuin,
  updateCacheConfigQuery,
} from '../database/index.js';
import cookie from 'cookies';

const updateStatistics = async (req, res, next) => {
  const cookies = new cookie(req, res);

  try {
    const { rows: cacheCongif } = await getConfiguraitonQuery();
    const { capacity, replacepolicy,  clearcache } = cacheCongif[cacheCongif.length - 1];

    const { rows: items } = await getImagesQuery(); 

    const requests_no = items.length;
    const items_no = items.length;

    let hit_rate = cookies.get('hit_rate')
      ? JSON.parse(cookies.get('hit_rate'))
      : 0;
    let miss_rate = cookies.get('miss_rate')
      ? JSON.parse(cookies.get('miss_rate'))
      : 0;

    if (clearcache) {
      hit_rate = 0;
      miss_rate = 0;
      cookies.set('hit_rate', 0);
      cookies.set('miss_rate', 0);
      await updateCacheConfigQuery(false);
      
    }
     await insertStatisticsQuery({
      items_no,
      items_size: capacity,
      requests_no,
      hit_rate,
      miss_rate,
    });

    res.status(200).send('success');
  } catch (error) {
    return next(error);
  }
};

export default updateStatistics;
