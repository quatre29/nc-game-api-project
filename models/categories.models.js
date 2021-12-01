const db = require("../db/connection");

//-------------------------------------------------------------

exports.selectCategories = async () => {
  const categories = await db.query(`SELECT * FROM categories`);
  return categories.rows;
};

//-------------------------------------------------------------

exports.postCategory = async (body) => {
  const category = await db.query(
    `
    INSERT INTO categories
    (
      slug, description
    )
    VALUES 
    ($1, $2)
    RETURNING *;
  `,
    [body.slug, body.description]
  );

  return category.rows[0];
};

//-------------------------------------------------------------
