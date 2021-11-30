const db = require("../db/connection");

exports.checkIfRowExists = async (id, table) => {
  let table_ref = "";
  let table_name = "";

  switch (table) {
    case "reviews":
      table_ref = "review_id";
      table_name = table;
      break;
    case "categories":
      table_ref = "slug";
      table_name = table;
      break;
    case "users":
      table_ref = "username";
      table_name = table;
      break;
    case "comments":
      table_ref = "comment_id";
      table_name = table;
      break;
  }
  const item = await db.query(
    `
        SELECT * FROM ${table_name} WHERE ${table_ref} = $1;
    `,
    [id]
  );

  if (item.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Not found!",
    });
  }
};
