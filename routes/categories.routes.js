const express = require("express");
const {
  fetchCategories,
  addCategory,
} = require("../controllers/categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(fetchCategories).post(addCategory);

module.exports = categoriesRouter;
