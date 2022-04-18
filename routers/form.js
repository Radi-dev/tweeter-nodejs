const express = require("express");
const router = express.Router();
const path = require('path');

const tweet = require("../tweet");

router.get('/',function(req,res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/',function(req,res) {
  var text=req.body.text;
  tweet(text)
  res.redirect('/')
});


module.exports = router;
