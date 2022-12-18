require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
mongoose.set("strictQuery", false);

app.use(express.json());

// connect to mongodb
mongoose.connect(
  "mongodb://localhost:27017/inotebook",
  {
    useNewUrlParser: true,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

//   available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(3000, function () {
  console.log("listening on port 3000");
});
