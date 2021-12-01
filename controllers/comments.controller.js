const {
  selectCommentsByReviewId,
  insertComment,
  deleteComment,
  patchComment,
} = require("../models/comments.models");
const { checkIfRowExists } = require("../utils/check");

//-------------------------------------------------------------

exports.getCommentsByReview = async (req, res, next) => {
  const { review_id } = req.params;

  const queryParams = req.query;
  const page = queryParams["page"];
  const limit = queryParams["limit"];

  try {
    await checkIfRowExists(review_id, "reviews");
    const comments = await selectCommentsByReviewId(review_id, page, limit);

    res.status(200).send({ comments, total_count: 0 });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.postComment = async (req, res, next) => {
  const { body } = req;
  const { review_id } = req.params;
  try {
    await checkIfRowExists(review_id, "reviews");

    const comment = await insertComment(body, review_id);
    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.removeComment = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await checkIfRowExists(comment_id, "comments");
    await deleteComment(comment_id);

    res.status(204).json({ msg: "no content" });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.voteComment = async (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;

  try {
    await checkIfRowExists(comment_id, "comments");

    const comment = await patchComment(inc_votes, comment_id);
    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

// ░░░░░░░░░░░░░░░░░░░░░░█████████
// ░░███████░░░░░░░░░░███▒▒▒▒▒▒▒▒███
// ░░█▒▒▒▒▒▒█░░░░░░░███▒▒▒▒▒▒▒▒▒▒▒▒▒███
// ░░░█▒▒▒▒▒▒█░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
// ░░░░█▒▒▒▒▒█░░░██▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒███
// ░░░░░█▒▒▒█░░░█▒▒▒▒▒▒████▒▒▒▒████▒▒▒▒▒▒██
// ░░░█████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
// ░░░█▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒██
// ░██▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒██▒▒▒▒▒▒▒▒▒▒██▒▒▒▒██
// ██▒▒▒███████████▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒██
// █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒████████▒▒▒▒▒▒▒██
// ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
// ░█▒▒▒███████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
// ░██▒▒▒▒▒▒▒▒▒▒████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█
// ░░████████████░░░█████████████████
