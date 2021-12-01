const db = require("../db/connection");
const { checkIfRowExists } = require("../utils/check");
const { rejectQuery } = require("../utils/query");

//-------------------------------------------------------------

exports.selectCommentsByReviewId = async (review_id, page = 1, limit = 10) => {
  const comments = await db.query(
    `
    SELECT * FROM comments
    WHERE review_id = $1
    LIMIT $3 OFFSET(($2 - 1) * $3)
  `,
    [review_id, page, limit]
  );
  return comments.rows;
};

//-------------------------------------------------------------

exports.insertComment = async (body, review_id) => {
  if (!body.username && !body.body) {
    return rejectQuery();
  }

  await checkIfRowExists(body.username, "users");

  const comment = await db.query(
    `
    INSERT INTO comments
    (
      author,
      body,
      review_id,
      created_at
    )
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING *;
  `,
    [body.username, body.body, review_id]
  );

  return comment.rows[0];
};

//-------------------------------------------------------------

exports.deleteComment = async (comment_id) => {
  const comment = await db.query(
    `
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;
  `,
    [comment_id]
  );

  return comment.rows[0];
};

//-------------------------------------------------------------

exports.patchComment = async (inc_votes, comment_id) => {
  const comment = await db.query(
    `
        UPDATE comments
        SET votes = votes + $1
        WHERE comment_id = $2
        RETURNING *;
    `,
    [inc_votes, comment_id]
  );

  return comment.rows[0];
};
