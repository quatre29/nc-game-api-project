const db = require("../connection");
const format = require("pg-format");

const seed = async ({ categoryData, commentData, reviewData, userData }) => {
  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS reviews`);
  await db.query(`DROP TABLE IF EXISTS categories`);

  // 1. create tables
  await db.query(`
  CREATE TABLE categories (
    slug VARCHAR(30) PRIMARY KEY UNIQUE,
    description TEXT
  );
  `);

  await db.query(`
    CREATE TABLE users (
      username VARCHAR(30) UNIQUE PRIMARY KEY,
      avatar_url VARCHAR(255),
      name VARCHAR(100)
    );
  `);

  await db.query(`
    CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      review_body TEXT,
      designer VARCHAR(1000),
      review_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR(100) REFERENCES categories(slug) NOT NULL,
      owner VARCHAR(100),
      created_at TIMESTAMP NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(30) REFERENCES users(username) NOT NULL,
      review_id INT REFERENCES reviews(review_id) NOT NULL,
      votes INT DEFAULT 0,
      created_at TIMESTAMP NOT NULL,
      body TEXT
    );
  `);
  // 2. insert data
  const insertCategories = format(
    `
    INSERT INTO categories
    (slug, description)
    VALUES
    %L
    RETURNING slug, description;
  `,
    categoryData.map(({ slug, description }) => [slug, description])
  );

  const insertUsers = format(
    `
    INSERT INTO users
    (username, avatar_url, name)
    VALUES
    %L
    RETURNING username, avatar_url, name;
  `,
    userData.map(({ username, avatar_url, name }) => [
      username,
      avatar_url,
      name,
    ])
  );

  const insertReviews = format(
    `
    INSERT INTO reviews
    ( 
      title,
      designer,
      review_body,
      review_img_url,
      votes,
      category,
      owner,
      created_at
    )
    VALUES
    %L
    RETURNING title, review_body, designer, review_img_url, votes, category, owner, created_at;
  `,
    reviewData.map(
      ({
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at,
      }) => [
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at,
      ]
    )
  );

  const insertComments = format(
    `
    INSERT INTO comments
    ( author, review_id, votes, created_at, body)
    VALUES
    %L
    RETURNING  author, review_id, votes, created_at, body;
  `,
    commentData.map(({ author, review_id, votes, created_at, body }) => [
      author,
      review_id,
      votes,
      created_at,
      body,
    ])
  );

  await db.query(insertCategories);
  await db.query(insertUsers);
  await db.query(insertReviews);
  await db.query(insertComments);
};

module.exports = seed;
