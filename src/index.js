//importing dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require("path");

//const form = require("./routers/form");
//const tweet = require('./tweetExt').router;
const newOne = require("./routers/callbacks")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.HASHING_TOKEN,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.set('view engine', 'ejs');

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/routers/views/about.html"));
});

app.use("/", newOne);
//app.use("/", tweet);
//app.use("/", form);
// Error handler


app.listen(5000, () => console.log("server running at port 5000"));
