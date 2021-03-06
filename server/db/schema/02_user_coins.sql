DROP TABLE IF EXISTS user_coins CASCADE;

CREATE TABLE user_coins (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  coin_id TEXT NOT NULL
);