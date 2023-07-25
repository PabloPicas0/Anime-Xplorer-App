const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>Server is running !</h1>");
});

const port = process.env.PORT || 1337;
const listener = app.listen(port, () => {
  console.log(`Your server is listening to localhost:${listener.address().port}`);
  console.log("Press ctrl + c to exit");
});
