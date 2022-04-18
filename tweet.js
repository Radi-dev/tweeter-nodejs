require('dotenv').config();

const { TwitterApi } = require('twitter-api-v2');


const T = new TwitterApi({
    appKey: process.env.API_KEY
    , appSecret: process.env.API_KEY_SECRET
    , accessToken: process.env.ACCESS_TOKEN
    , accessSecret: process.env.ACCESS_TOKEN_SECRET
})

//The tweeting function
const tweet =async (text) => {
    await T.v2.tweetThread(splitIntoThread(text));
};


const splitIntoThread = (_text) => {
    const text = _text.split(" ");
    let count = 0;
    let threshold = 230;
    let thread = [];
    let msg = [];
    for (const [i, item] of text.entries()) {
        if (i === text.length - 1) {
            msg.push(item);
            count += (item.length + 1); //add extra one to account for spaces during join
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
            count += (item.length + 1);
            continue;
        }

        msg.push(item);
        count += (item.length + 1);
    }
    return thread;
};

//console.log(splitIntoThread("Hello world, this is my first real tweet, and it is not “real”. Last weekend, I took time to learn back-end development using NodeJs after several years of doing so solely in Python(Django). It didn’t take time at all. But to be sure I actually learned anything, I’ve embarked on a personal project to make scheduled tweets using the ExpressJs framework. So, if you’re seeing this text, it means I've successfully made my first POST request to the Twitter API using NodeJs. Currently, the project still has a long way to go and I’ll be making updates to the app over time to add more features. I’ll also be building a python version of the app. The repository for this app can be found at: https://github.com/Radi-dev/tweeter-nodejs#javascript #coding #Nodejs #develope"))

module.exports = tweet;