require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

var cors = require('cors')

const port = 5000;

const app = express();
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors())

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

app.listen(port, function () {
  console.log("listening on port 3000");
});
