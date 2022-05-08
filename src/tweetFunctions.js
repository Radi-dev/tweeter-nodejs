// require('dotenv').config();

// const { TwitterApi } = require('twitter-api-v2');
// const client = new TwitterApi({
//     appKey: process.env.API_KEY
//     , appSecret: process.env.API_KEY_SECRET
//     , accessToken: process.env.ACCESS_TOKEN
//     , accessSecret: process.env.ACCESS_TOKEN_SECRET
// })

const getLatest =async (client) => {
    const tweets = await client.v2.tweets(['20', '141','1519472395488272384']);
    //post as thread
    return tweets;
    //client.post("statuses/update",{status:text},onComplete);
};

const replyTweet =async (client,id,text) => {
    const tweets = await client.v2.reply(text,id);
    //post as thread
    return tweets;
    //client.post("statuses/update",{status:text},onComplete);
};


const tweet = async (text, client, countThread = true) => {
    const textList = splitIntoThread(text, countThread);
    let tweetedThread;
    let tweeted;
    textList.length > 1
      ? tweetedThread= await client.v2.tweetThread(textList)
      : tweeted= await client.v2.tweet(textList[0]);
    if(tweetedThread){
      await console.log('Tweeted thread', ':', tweetedThread[0]?.text);
    }
    else if(tweeted){
      await console.log('Tweeted', tweeted.id, ':', tweeted.text,tweeted);
    }
  };
  
const splitIntoThread = (_text, showCount = false) => {
    const text = _text.split(" ");
    let count = 0;
    const _threshold = 230;
    const threshold = showCount ? _threshold - 5 : _threshold;
    let thread = [];
    let msg = [];
    for (const [i, item] of text.entries()) {
      if (i === text.length - 1) {
        msg.push(item);
        count += item.length + 1; //add extra one to account for spaces during join
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
        count += item.length + 1;
        continue;
      }
  
      msg.push(item);
      count += item.length + 1;
    }
    if (showCount && thread.length > 1) {
      let numberedThread = [];
      for (const [i, text] of thread.entries()) {
        const numberedText = `${i + 1}/${thread.length} ${text}`;
        numberedThread.push(numberedText);
      }
      thread = numberedThread;
    }
    return thread;
  };
  







module.exports = {getLatest:getLatest, postTweet:tweet, replyTweet:replyTweet};