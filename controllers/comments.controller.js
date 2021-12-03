const {
  selectCommentsByReviewId,
  insertComment,
  deleteComment,
  patchVoteComment,
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
    const [comment] = await Promise.all([
      insertComment(body, review_id),
      checkIfRowExists(review_id, "reviews"),
    ]);

    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.updateComment = async (req, res, next) => {
  const { comment_id } = req.params;
  const { body } = req.body;
  try {
    const [comment] = await Promise.all([
      patchComment(comment_id, body),
      checkIfRowExists(comment_id, "comments", "comment not found!"),
    ]);

    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.removeComment = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await Promise.all([
      checkIfRowExists(comment_id, "comments"),
      deleteComment(comment_id),
    ]);

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
    const [comment] = await Promise.all([
      patchVoteComment(inc_votes, comment_id),
      checkIfRowExists(comment_id, "comments"),
    ]);

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
