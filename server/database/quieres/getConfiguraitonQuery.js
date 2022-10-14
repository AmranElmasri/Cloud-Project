import { connection } from '../config/index.js';

const getConfiguraitonQuery = () => {
    const sql = {
        text: 'SELECT * FROM cache_configuration',
    };
    return connection.query(sql);
}

export default getConfiguraitonQuery;