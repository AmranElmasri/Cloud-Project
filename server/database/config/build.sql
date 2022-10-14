BEGIN;

DROP TABLE IF EXISTS images, cache_configuration, cache_statistics CASCADE;


CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  image TEXT NOT NULL,
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE

);

CREATE TABLE cache_configuration (
  id SERIAL PRIMARY KEY,
  capacity INTEGER DEFAULT 10,
  replacePolicy VARCHAR(255),
  clearCache BOOLEAN DEFAULT FALSE,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE

);

INSERT INTO cache_configuration (capacity, replacePolicy) VALUES (10, 'LRU');

CREATE TABLE cache_statistics (
  id SERIAL PRIMARY KEY,
  items_no INTEGER NOT NULL,
  items_size INTEGER NOT NULL,
  requests_no INTEGER NOT NULL,
  miss_rate INTEGER NOT NULL,
  hit_rate INTEGER NOT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

COMMIT;
