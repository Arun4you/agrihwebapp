var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var engine = require("ejs-mate");
var cors = require("cors");
var app = express();
// var mainRoute = require("./routes/main");
var uploadRoute = require("./routes/upload");

require("dotenv").config({
  silent: true
});

app.options("*", cors());
app.set("view engine", "ejs");
app.engine("ejs", engine);
app.use(express.static(__dirname + "/client/dist"));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", mainRoute);
app.use("/", uploadRoute);

app.listen(process.env.PORT, function(err) {
  if (err) console.log(err);
  console.log("Server is Running on port " + process.env.PORT);
});
