const db = require("../connection");
const format = require("pg-format");
const slugify = require("../../utils/slugify");

const seed = async ({ categoryData, commentData, reviewData, userData }) => {
  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS reviews`);
  await db.query(`DROP TABLE IF EXISTS categories`);

  // 1. create tables
  await db.query(`
  CREATE TABLE categories (
    slug VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL,
    description TEXT NOT NULL
  );
  `);

  await db.query(`
    CREATE TABLE users (
      username VARCHAR(30) UNIQUE PRIMARY KEY  NOT NULL,
      avatar_url VARCHAR(255),
      name VARCHAR(100)  NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      review_body TEXT NOT NULL,
      designer VARCHAR(1000) NOT NULL,
      review_img_url VARCHAR(255)  NOT NULL DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0  NOT NULL,
      category VARCHAR(100) REFERENCES categories(slug) NOT NULL,
      owner VARCHAR(100)  NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY  NOT NULL,
      author VARCHAR(30) REFERENCES users(username) NOT NULL,
      review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE NOT NULL,
      votes INT  NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL,
      body TEXT  NOT NULL
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
    categoryData.map(({ slug, description }) => {
      const slugified = slugify(slug);
      // return [slug, description];
      return [slugified, description];
    })
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
    RETURNING title, designer, review_body , review_img_url, votes, category, owner, created_at;
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
      }) => {
        const slugified = slugify(category);

        return [
          title,
          review_body,
          designer,
          review_img_url,
          votes,
          slugified,
          owner,
          created_at,
        ];
      }
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
