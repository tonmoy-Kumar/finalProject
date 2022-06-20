const express = require("express");

const users = require("./route/users");
const logger = require("morgan");
const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use("/users", users);

//default errorhandler---------------------------------------------------------delet end
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);
const port = 8008;
app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
