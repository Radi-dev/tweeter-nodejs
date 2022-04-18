
//importing dependencies
const express = require("express")
const app=express();
const bodyParser = require('body-parser');
const path = require('path');


const form = require("./routers/form");


//middlewares
//app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/routers/views/about.html'));
});

app.use("/", form);






  app.listen(5000, () => console.log("server running at port 5000"));