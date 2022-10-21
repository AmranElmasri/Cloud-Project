import { connection } from '../config/index.js';

const updateCacheConfigQuery = (clearCache) => {
    const sql = {
        text: "UPDATE cache_configuration SET clearcache = $1",
        values: [clearCache],
    };
    return connection.query(sql);
}

export default updateCacheConfigQuery;