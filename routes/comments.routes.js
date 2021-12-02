const express = require("express");
const {
  removeComment,
  voteComment,
} = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(removeComment);
commentsRouter.route("/:comment_id/vote").patch(voteComment);

module.exports = commentsRouter;
