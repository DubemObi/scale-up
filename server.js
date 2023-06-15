const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./index");
const { PORT, DB } = process.env;

mongoose.connect(DB).then(() => {
  console.log("Connected to Database");
});

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
