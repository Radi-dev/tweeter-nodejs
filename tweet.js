const Twit = require("twit");
require('dotenv').config();

//initialize twit library with acsess tokens from .env file
const T = new Twit({
    consumer_key: process.env.API_KEY
    , consumer_secret: process.env.API_KEY_SECRET
    , access_token: process.env.ACCESS_TOKEN
    , access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

//The tweeting function
const tweet = (text)=>{
    const onComplete = (err,reply)=>{
        if(err){
            console.log("Error:",err.message);
        }
        else{
            console.log("Success:",reply);
        }
    };
    //console.log(text)
    //return text
    T.post("statuses/update",{status:text},onComplete);
};


module.exports = tweet;