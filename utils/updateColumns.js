const db = require("../db/connection");
const { rejectQuery } = require("./query");
const updateColumns = async (unique_id, table, objBody) => {
  let rowIdentifier = "";

  switch (table) {
    case "reviews":
      rowIdentifier = "review_id";
      break;
    case "users":
      rowIdentifier = "username";
      break;
    case "comments":
      rowIdentifier = "comment_id";
      break;
    case "categories":
      rowIdentifier = "categories";
      break;
    default:
      rejectQuery(_, 400);
  }

  const objFields = {};

  Object.keys(objBody).forEach((key, i) => {
    objFields[key] = `${key} = $${i + 1}`;
  });

  const updates = Object.values(objFields);

  const query = await db.query(
    `
              UPDATE ${table}
              SET ${updates}
              WHERE ${rowIdentifier} = $${updates.length + 1}
              RETURNING *;
            `,
    [...Object.values(objBody), unique_id]
  );
  return query.rows[0];
};

module.exports = updateColumns;
