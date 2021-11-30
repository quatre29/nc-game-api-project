const db = require("../db/connection");
const { rejectQuery } = require("../utils/query");

//-------------------------------------------------------------

exports.getAllReviews = async (
  sort_by = "date",
  sort_order = "descending",
  category
) => {
  let sort_criteria = "";
  let sort_order_criteria = "";
  let query_string = `
    SELECT reviews.*, COUNT (comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
  `;
  let group_by = "GROUP BY reviews.review_id";

  switch (sort_by) {
    case "date":
      sort_criteria = "ORDER BY created_at";
      break;
    case "owner":
      sort_criteria = "ORDER BY owner";
      break;
    case "designer":
      sort_criteria = "ORDER BY designer";
      break;
    case "title":
      sort_criteria = "ORDER BY title";
      break;
    case "votes":
      sort_criteria = "ORDER BY votes";
      break;
    case "comments":
      sort_criteria = "ORDER BY comments_count";
      break;
    default:
      return rejectQuery();
  }

  switch (sort_order) {
    case "ascending":
      sort_order_criteria = "ASC";
      break;
    case "descending":
      sort_order_criteria = "DESC";
      break;
    default:
      return rejectQuery();
  }

  let reviews;
  if (category) {
    reviews = await db.query(
      `
    ${query_string} WHERE category = $1 ${group_by} ${sort_criteria} ${sort_order_criteria};
`,
      [category]
    );
    if (reviews.rows.length === 0)
      return Promise.reject({ status: 404, msg: "Not found!" });
  } else {
    reviews = await db.query(`
      ${query_string} ${group_by} ${sort_criteria} ${sort_order_criteria};
  `);
  }

  return reviews.rows;
};

//-------------------------------------------------------------

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

//-------------------------------------------------------------

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

  return review.rows[0];
};

//-------------------------------------------------------------
