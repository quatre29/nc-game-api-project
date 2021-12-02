const db = require("../db/connection");

exports.rejectQuery = (msg = "Bad request!", status = 400) => {
  return Promise.reject({ status, msg });
};

exports.getTotalCountOfTableRows = async (table) => {
  let tableName = "";
  switch (table) {
    case "reviews":
      tableName = table;
      break;
    case "users":
      tableName = table;
      break;
    case "comments":
      tableName = table;
      break;
    case "categories":
      tableName = table;
      break;
    default:
      this.rejectQuery("table not found!", 404);
  }
  const tables = await db.query(
    `
    SELECT * FROM ${tableName};
  `
  );

  return tables.rows.length;
};
