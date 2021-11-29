const express = require("express");

const categoriesRouter = require("./categories.routes");
const commentsRouter = require("./comments.routes");
const reviewsRouter = require("./reviews.routes");
const usersRouter = require("./users.routes");

const apiRouter = express.Router();

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
