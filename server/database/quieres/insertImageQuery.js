import { connection } from '../config/index.js';

const insertImageQuery = (key, image) => {
    const sql = {
        text: 'INSERT INTO images (key, image) VALUES ($1, $2) RETURNING *',
        values: [key, image],
    };
    return connection.query(sql);
}   

export default insertImageQuery;