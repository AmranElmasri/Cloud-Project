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

