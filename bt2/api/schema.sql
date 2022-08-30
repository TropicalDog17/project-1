DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS article (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link TEXT UNIQUE NOT NULL,
  title TEXT UNIQUE NOT NULL,
  content TEXT

);

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email text UNIQUE  NOT NULL,
  password text UNIQUE NOT NULL,
);