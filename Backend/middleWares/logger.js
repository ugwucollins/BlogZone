import colors from "colors";

const colormethods = {
  GET: "green",
  error: "red",
  POST: "yellow",
  PUT: "blue",
  PATCH: "blue",
  DELETE: "red",
};
export const logger = (req, res, next) => {
  const color = colormethods[req.method] || white;
  console.log(
    `${req.method["bold"]} ${req.protocol}//${req.get("host")}${
      req.originalUrl
    }`[color]
  );
  next();
};
