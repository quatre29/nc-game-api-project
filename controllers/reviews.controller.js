const {
  selectReviewById,
  patchReview,
  getAllReviews,
} = require("../models/reviews.models");

const { checkIfRowExists } = require("../utils/check");

//-------------------------------------------------------------

exports.fetchReviews = async (req, res, next) => {
  const queryParams = req.query;
  const sort_by = queryParams["sort_by"];
  const sort_order = queryParams["order"];
  const category = queryParams["category"];
  const page = queryParams["page"];
  const limit = queryParams["limit"];

  try {
    const reviews = await getAllReviews(
      sort_by,
      sort_order,
      category,
      page,
      limit
    );
    res.status(200).send({ reviews });
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

// exports.funcNme = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next(err)
//     }
// };
