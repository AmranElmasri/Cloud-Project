import { saveConfiguratuin } from '../database/index.js';
import { cache } from '../routes/index.js';

const cacheConfiguration = async (req, res) => {
  const { capacity, replacePolicy, clearCache } = req.body;

  const cacheCapacity = capacity.replace('mb', '');
  cache.capacity = cacheCapacity;

  if(clearCache){
    cache.clear();
  }

  try {
    await saveConfiguratuin({ cacheCapacity, replacePolicy, clearCache });
  } catch (error) {
    console.log(error);
  }
};
export default cacheConfiguration;
