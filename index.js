const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const globalErrorHandler = require("./src/controllers/error-controller");
const userRouter = require("./src/routes/userRoutes");

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
