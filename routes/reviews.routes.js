const express = require("express");
const {
  fetchReviewById,
  updateReview,
  fetchReviews,
  postReview,
} = require("../controllers/reviews.controller");
const {
  getCommentsByReview,
  postComment,
} = require("../controllers/comments.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/").get(fetchReviews).post(postReview);
reviewsRouter.route("/:review_id").get(fetchReviewById).patch(updateReview);
reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReview)
  .post(postComment);

module.exports = reviewsRouter;
