//const Twit = require("twit");
require('dotenv').config();

const { TwitterApi } = require('twitter-api-v2');
//import { TwitterApi } from 'twitter-api-v2';

//initialize twit library with acsess tokens from .env file

// const T = new Twit({
//     consumer_key: process.env.API_KEY
//     , consumer_secret: process.env.API_KEY_SECRET
//     , access_token: process.env.ACCESS_TOKEN
//     , access_token_secret: process.env.ACCESS_TOKEN_SECRET
// })

const T = new TwitterApi({
    appKey: process.env.API_KEY
    , appSecret: process.env.API_KEY_SECRET
    , accessToken: process.env.ACCESS_TOKEN
    , accessSecret: process.env.ACCESS_TOKEN_SECRET
})

//The tweeting function
const tweet =async (text) => {
    await T.v2.tweetThread(splitIntoThread(text));
    //post as thread

    //T.post("statuses/update",{status:text},onComplete);
};


const splitIntoThread = (_text) => {
    const text = _text.split(" ");
    let count = 0;
    let threshold = 220;
    let thread = [];
    let msg = [];
    for (const [i, item] of text.entries()) {
        if (i === text.length - 1) {
            msg.push(item);
            count += item.length;
            const _msg = msg.join(" ");
            thread.push(_msg);
            msg = [];
            count = 0;
            continue;
        }
        if (count + item.length > threshold) {
            msg.push("...");
            const _msg = msg.join(" ");
            thread.push(_msg);
            msg = [];
            count = 0;
            msg.push(item);
            count += item.length;
            continue;
        }

        msg.push(item);
        count += item.length;
    }
    return thread;
};



module.exports = tweet;