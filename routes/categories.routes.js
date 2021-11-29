const express = require("express");
const { fetchCategories } = require("../controllers/categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(fetchCategories);

module.exports = categoriesRouter;
