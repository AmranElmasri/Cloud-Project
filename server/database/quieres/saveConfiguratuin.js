import { connection } from '../config/index.js';

const saveConfiguratuin = ({cacheCapacity, replacePolicy, clearCache}) => {
    const sql = {
        text: 'INSERT INTO cache_configuration (capacity, replacePolicy, clearCache) VALUES ($1, $2, $3) RETURNING *',
        values: [cacheCapacity, replacePolicy, clearCache],
    };
    return connection.query(sql);
}

export default saveConfiguratuin;