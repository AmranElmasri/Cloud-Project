import { connection } from '../config/index.js';

const getImageQuery = (key) => {
    const sql = {
        text: 'SELECT * FROM images WHERE key = $1',
        values: [key],
    };
    return connection.query(sql);
}   

export default getImageQuery;
