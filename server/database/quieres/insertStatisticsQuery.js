import { connection } from '../config/index.js';

const insertStatisticsQuery = ({
  items_no,
  items_size,
  requests_no,
  miss_rate,
  hit_rate,
}) => {
  const sql = {
    text: 'INSERT INTO cache_statistics (items_no, items_size, requests_no, miss_rate, hit_rate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [items_no, items_size, requests_no, miss_rate, hit_rate],
  };
  return connection.query(sql);
};

export default insertStatisticsQuery;
