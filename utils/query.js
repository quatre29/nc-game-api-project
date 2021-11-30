exports.rejectQuery = () => {
  return Promise.reject({ status: 400, msg: "Bad request!" });
};
