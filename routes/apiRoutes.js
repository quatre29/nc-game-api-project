const express = require("express");

const categoriesRouter = require("./categories.routes");
const commentsRouter = require("./comments.routes");
const reviewsRouter = require("./reviews.routes");
const usersRouter = require("./users.routes");

const { getDocumentation } = require("../controllers/api.controller");

const apiRouter = express.Router();

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/", getDocumentation);

module.exports = apiRouter;
