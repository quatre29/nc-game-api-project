const {
  selectReviewById,
  patchReview,
  getAllReviews,
  insertReview,
  deleteReview,
} = require("../models/reviews.models");

const { checkIfRowExists } = require("../utils/check");
const { getTotalCountOfTableRows } = require("../utils/query");

//-------------------------------------------------------------

exports.fetchReviews = async (req, res, next) => {
  const queryParams = req.query;
  const sort_by = queryParams["sort_by"];
  const sort_order = queryParams["order"];
  const category = queryParams["category"];
  const page = queryParams["page"];
  const limit = queryParams["limit"];

  try {
    const counting = getTotalCountOfTableRows("reviews");
    const gettingReviews = getAllReviews(
      sort_by,
      sort_order,
      category,
      page,
      limit
    );

    const [totalCount, reviews] = await Promise.all([counting, gettingReviews]);
    res.status(200).send({ reviews, total_count: totalCount });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.fetchReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;

    const review = await selectReviewById(review_id);

    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.updateReview = async (req, res, next) => {
  try {
    const { inc_votes } = req.body;
    const { review_id } = req.params;

    await checkIfRowExists(review_id, "reviews");

    const review = await patchReview(inc_votes, review_id);
    res.status(201).send({ review });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.postReview = async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    res.status(201).send({ review });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.removeReview = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    await checkIfRowExists(review_id, "reviews", "review doesn't exist!");
    await deleteReview(review_id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

// exports.funcNme = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next(err)
//     }
// };
