DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS comment;

CREATE TABLE article (
  article_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL
);

CREATE TABLE comment (
  post_id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  article_id INTEGER NOT NULL,
  FOREIGN KEY (article_id) REFERENCES article (article_id)
);