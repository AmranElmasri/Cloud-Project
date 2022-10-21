


# cloud project (first part)

#### The idea of this application is to store the images in the cloud, put the link of that image in my databases, and then store the content of images in the cache when requested.

#### I can put (capacity, replacement policy, etc.) for the cache


#### The mem-cache should support two cache replacement policies:
* Random Replacement
  * Randomly selects a key and discards it to make space when necessary.
* Least Recently Used
  * Discards the least recently used keys first. 

#### The mem-cache should store its statistics every 5 seconds.

---
## database schema :
![](https://i.imgur.com/7bTklDG.png)


---
# Insert Image Section 

In the insert image section, we have to inputs one for the key which is required and unique, and one for the uploaded image and also must be required
We saved the key and the path of the image in the database after we uploaded the image to S3 
<br />
![insertImage](https://i.imgur.com/gWNKGvZ.png)
<br />
[Link Github for insert image controller](https://github.com/AmranElmasri/Cloud-Project/blob/main/server/controllers/insertImage.js)

---

# cache implementation


## LRUCache Code Explanation


- The code is a simple implementation of a LRUCache.
- The constructor takes in an integer capacity, and the get() method returns -1 if the key does not exist in the map.
- Otherwise, it returns the value of the key
- The put() method sets a new node with the key and value to be inserted into the list, and then adds that new node to the list.
- Finally, it increments size by one after inserting that new node into its place in this list.
- The clear() function removes all nodes from this list so that there is no more data stored within it and then resets size back to 0 as well as clearing out any old data from this map so that there are no more keys or values stored within it either.

[Link Code On GitHub Here](https://github.com/AmranElmasri/Cloud-Project/blob/main/server/utils/cache/LRUCache.js)
```javascript
class LRUCache {
  constructor(capacity) {
    this.map = {};
    this.list = new DoublyLinkedList();
    this.capacity = capacity;
    this.size = 0;
  }

  get(key) {
    if (!this.map[key]) return -1;
    const node = this.map[key];
    this.list.move2front(node);
    return node.value;
  }
  put(key, value) {
    if (this.map[key]) {
      const node = this.map[key];
      node.value = value;
      this.list.move2front(node);
      return;
    }

    if (this.size === this.capacity) {
      const node = this.list.removeLast();
      delete this.map[node.key];
      this.size--;
    }

    const newNode = new Node(key, value);
    this.list.add(newNode);
    this.map[key] = newNode;
    this.size++;
  }
  clear(){
    this.map = {};
    this.list = new DoublyLinkedList();
    this.size = 0;
  }
}
```
## Randomo cache
- Grab the specific key and value from the cache as a random 
```javascript=
class RandomCache {
  constructor(capacity) {
    this.cache = {};
    this.capacity = capacity;
    this.size = 0;
  }

  get(key) {
    return this.cache[key];
  }

  put(key, value) {
    if (this.size === this.capacity) {
      const randomNum = Math.round(Math.random() * this.capacity);
      const randomKey = Object.keys(this.cache)[randomNum];
      delete this.cache[randomKey];
      this.size--;
    }
    this.cache[key] = value;
    this.size++;
  }
  clear() {
    this.cache = {};
    this.size = 0;
  }
}

export default RandomCache;


```


---
# Get Image Section 
- The code starts by importing the checkKeyQuery and getImageQuery functions, which are used to query for a key's hit rate and miss rate.
- The cache is then referenced in order to retrieve the image associated with that key if it exists in the database.
- The function starts by checking if there is an old value stored for this key using checkKeyQuery(key).
- If there isn't, then a 400 error will be returned as per our 404 page not found logic.
- Otherwise, we use getImageQuery(key) to fetch all of the rows associated with that particular key and store them into an array called rows .
- We also store rowCount , which tells us how many images were retrieved from our database when we ran this query.
- Finally, we use cache.put() to save these values so they can be accessed later on without having to run another query again (i.e., caching).
- The code is a function that returns the image of an item in the cache.

[Link Code On GitHub Here](https://github.com/AmranElmasri/Cloud-Project/blob/main/server/controllers/getImage.js)
```javascript
import { checkKeyQuery, getImageQuery } from '../database/index.js';
import { cache } from '../routes/index.js';
import cookie from "cookies";

const getImage = async (req, res, next) => {
  const { key } = req.query;
  const cookies = new cookie(req, res);
  try {
    let hit_rate = cookies.get('hit_rate') ? JSON.parse(cookies.get('hit_rate')) : 0;
    let miss_rate = cookies.get('miss_rate') ? JSON.parse(cookies.get('miss_rate')) : 0;
    if(cache.get(key) !== -1){
      hit_rate = Math.round(100 - (miss_rate / 2));
      miss_rate = Math.round(100 - hit_rate);
      cookies.set('hit_rate', JSON.stringify(hit_rate));
      cookies.set('miss_rate', JSON.stringify(miss_rate));
      return res.status(200).json(cache.get(key));
    }
    const {rowCount: oldKey} = await checkKeyQuery(key);
    if (oldKey === 0) {
      return res.status(400).json({ message: 'Key does not exist in our records' });
    } 
    const { rows, rowCount } = await getImageQuery(key);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const image = rows[0];
    cache.put(key, image);
    miss_rate = Math.round(100 - (hit_rate / 2));
    hit_rate = Math.round(100 - miss_rate);
    cookies.set('hit_rate', JSON.stringify(hit_rate));
    cookies.set('miss_rate', JSON.stringify(miss_rate));
    return res.status(200).json(image);
  } catch (error) {
    return next(error);
  }
};
export default getImage;
``` 
![](https://i.imgur.com/jj1QZ7k.png)


---

# List Images Section
- To get all images and keys from the database and render them.
<br/>
![](https://i.imgur.com/OuPFE2f.png)

<br/>


---

# Cache Configuration Section
* It has a cache object that is used to store images in memory. The cache object can be configured by the user to have different capacities and replacement policies (LRU or Random).
#### How does it do it?
- The router file has a cache object that is used to store images in memory. The cache object can be configured by the user to have different capacities and replacement policies (LRU or Random).

#### What are its inputs and outputs?
- capacity: Number of megabytes that the cache will hold.

- replacePolicy: Replacement policy for when we need to remove an image from the cache because there isn't enough space left in memory; There are two options LRU or random;

- clearCache: Boolean value indicating if we want to clear all images from our current cache before saving new configuration values; This option is useful when you want to change your replacement policy without losing any data stored in your current cahce.  

 ##### Outputs:  A JSON response containing message property with success message if everything goes well otherwise error messages as appropriate
 
  ![](https://i.imgur.com/JhDcH2k.png)
  
 [Link Code On GitHub Here](https://github.com/AmranElmasri/Cloud-Project/blob/main/server/routes/index.js)
 


---

# Statistics Section

- Display a page with the current statistics for the mem-cache over the past 10 minutes.

- The mem-cache uses the database to store statistics (number of items in cache, total size of items in cache, number of requests served, miss rate and hit rate). 
- The mem-cache should store its statistics every 5 seconds. 
- The web front end uses the database to keep track of the list of known keys, to set configuration values for the mem-cache and to query statistics stored by the mem-cache.

![](https://i.imgur.com/oVvKuCd.png)

[Link Code On GitHub Here](https://github.com/AmranElmasri/Cloud-Project/blob/main/server/controllers/updateStatistics.js)

---


### Thank you! :sheep: 
