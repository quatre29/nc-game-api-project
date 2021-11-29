const {
  selectReviewById,
  patchReview,
  getAllReviews,
} = require("../models/reviews.models");

exports.fetchReviews = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).send({ reviews });
  } catch (err) {
    next(err);
  }
};

exports.fetchReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;

    const review = await selectReviewById(review_id);

    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { inc_votes } = req.body;
    const { review_id } = req.params;

    const review = await patchReview(inc_votes, review_id);
    res.status(201).send({ review });
  } catch (err) {
    next(err);
  }
};

// exports.funcNme = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next(err)
//     }
// };
