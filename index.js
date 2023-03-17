const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const globalErrorHandler = require("./src/controllers/error-controller");

const app = express();

const userRouter = require("./src/routes/userRoutes");

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);

mongoose.connect(process.env.DB).then(() => {
  console.log("Connected to Database");
});
app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
