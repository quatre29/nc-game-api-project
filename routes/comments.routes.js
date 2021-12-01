const express = require("express");
const {
  removeComment,
  voteComment,
} = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").patch(voteComment).delete(removeComment);

module.exports = commentsRouter;
