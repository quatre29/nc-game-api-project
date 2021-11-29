const db = require("../db/connection");

exports.selectCategories = async () => {
  const categories = await db.query(`SELECT * FROM categories`);
  return categories.rows;
};
