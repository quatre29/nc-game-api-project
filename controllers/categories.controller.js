const { selectCategories } = require("../models/categories.models");

exports.fetchCategories = async (req, res, next) => {
  try {
    const categories = await selectCategories();
    res.status(200).send({ categories });
  } catch (err) {
    next(err);
  }
};

// exports.funcNme = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next(err)
//     }
// };
