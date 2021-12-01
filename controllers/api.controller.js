const documentation = require("../models/documentation.models");

exports.getDocumentation = async (req, res, next) => {
  try {
    res.status(200).send({ documentation });
  } catch (err) {
    next(err);
  }
};
