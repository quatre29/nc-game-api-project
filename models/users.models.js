const db = require("../db/connection");
const { checkIfRowExists } = require("../utils/check");

//-------------------------------------------------------------

exports.selectUsers = async () => {
  const users = await db.query(`
    SELECT username FROM users;
  `);

  return users.rows;
};

//-------------------------------------------------------------

exports.selectUser = async (username) => {
  await checkIfRowExists(username, "users");

  const user = await db.query(
    `
        SELECT username, avatar_url, name 
        FROM users
        WHERE username = $1
    `,
    [username]
  );

  console.log(user.rows, "<<<<<<<<<<<<<<<<<<<<<<<<<");
  return user.rows[0];
};

//-------------------------------------------------------------
