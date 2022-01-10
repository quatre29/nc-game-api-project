const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
} = require("../controllers/users.controllers");

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUser).patch(updateUser);

module.exports = usersRouter;
