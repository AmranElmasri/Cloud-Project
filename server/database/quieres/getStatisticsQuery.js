import { connection } from '../config/index.js';

const getStatisticsQuery = () => {
    const sql = {
        text: 'SELECT * FROM cache_statistics',
    };
    return connection.query(sql);
}

export default getStatisticsQuery;