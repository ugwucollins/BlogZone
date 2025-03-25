const err = (req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
};
export default err;
