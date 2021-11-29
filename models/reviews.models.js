const db = require("../db/connection");

exports.getAllReviews = async () => {
  const reviews = await db.query(`
    SELECT reviews.*, COUNT (comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id;
`);

  return reviews.rows;
};

exports.selectReviewById = async (review_id) => {
  const reviews = await db.query(
    `
    SELECT reviews.*, COUNT (comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;
`,
    [review_id]
  );
  return reviews.rows[0];
};

exports.patchReview = async (inc_votes, review_id) => {
  const review = await db.query(
    `
        UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *;
    `,
    [inc_votes, review_id]
  );

  if (review.rows.length === 0) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request! Review could not be found",
    });
  }

  return review.rows[0];
};
