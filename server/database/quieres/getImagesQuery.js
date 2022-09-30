import { connection } from '../config/index.js';

const getImagesQuery = () => {
    const sql = {
        text: 'SELECT * FROM images',
    };
    return connection.query(sql);
}

export default getImagesQuery;