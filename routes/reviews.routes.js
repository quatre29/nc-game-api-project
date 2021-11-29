const express = require("express");
const {
  fetchReviewById,
  updateReview,
  fetchReviews,
} = require("../controllers/reviews.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/").get(fetchReviews);
reviewsRouter.route("/:review_id").get(fetchReviewById).patch(updateReview);

module.exports = reviewsRouter;
