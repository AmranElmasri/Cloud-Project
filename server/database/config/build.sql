BEGIN;

DROP TABLE IF EXISTS images, cache_configuration, cache_statistics CASCADE;


CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  image TEXT NOT NULL,
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE

);

CREATE TABLE cache_configuration (
  capacity INTEGER NOT NULL,
  replacement_policy VARCHAR(255) NOT NULL
);

CREATE TABLE cache_statistics (
  items INTEGER NOT NULL,
  size INTEGER NOT NULL,
  number_of_requests INTEGER NOT NULL,
  miss_rate INTEGER NOT NULL,
  hit_rate INTEGER NOT NULL
);

COMMIT;
