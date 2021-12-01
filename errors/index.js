exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else if (err.code === "23505") {
    res
      .status(400)
      .send({ msg: "you cannot have duplicate values in unique columns!" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  console.log(req.params, "params");
  console.log(req.query, "query");
  console.log(req.body, "body");
  console.log(req.url, "url");
  res.status(500).send({ msg: "Internal Server Error" });
};
