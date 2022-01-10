const {
  selectUsers,
  selectUser,
  patchUser,
} = require("../models/users.models");
const { checkIfRowExists } = require("../utils/check");

//-------------------------------------------------------------

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.status(200).send({ users });
  } catch (err) {
    next;
  }
};

//-------------------------------------------------------------

exports.getUser = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await selectUser(username);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

exports.updateUser = async (req, res, next) => {
  const { username } = req.params;
  const body = req.body;

  try {
    const [user] = await Promise.all([
      patchUser(username, body),
      checkIfRowExists(username, "users", "user not found!"),
    ]);

    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

//-------------------------------------------------------------

// ........(....\.................../....)
// .........\....\................ /..../
// ..........\....\.............../..../
// ...........\..../´¯.|.¯`\./.../
// .........../... |....|.... (¯ `\
// ..........|.....|´¯.|´¯.|\....\
// ..........\......` ¯..¯ ´......•
// ...........\_ ............ _.•´
