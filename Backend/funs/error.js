const errorhandle = (err, req, res, next) => {
  console.log({ message: err.message });
  return res.status(404).json({ message: err.message });
};

export default errorhandle;
