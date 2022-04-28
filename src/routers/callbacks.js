require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const router = require("express").Router();
const asyncWrapOrError = require('../utils');
const tweetFunctions =require("../tweetFunctions");
const path = require('path');

let TOKENS = {
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
  };
const updateTokens=(req)=>{
  TOKENS.accessToken= req.session.accessToken
  TOKENS.accessSecret= req.session.accessSecret
}
let requestClient= new TwitterApi({ ...TOKENS });



// -- FLOW 1: --
// -- Callback flow --

// Serve HTML index page with callback link
router.get('/o', asyncWrapOrError(async (req, res) => {
  const link = await requestClient.generateAuthLink('http://localhost:5000/');
  // Save token secret to use it after callback
  req.session.oauthToken = link.oauth_token;
  req.session.oauthSecret = link.oauth_token_secret;

  res.render('index', { authLink: link.url, authMode: 'callback' });
}));

// Read data from Twitter callback
router.get('/', asyncWrapOrError(async (req, res) => {
  // Invalid request
  if (!req.query.oauth_token || !req.query.oauth_verifier) {
    res.status(400).render('error', { error: 'Bad request, or you denied application access. Please renew your request.' });
    return;
  }

  const token = req.query.oauth_token;
  const verifier = req.query.oauth_verifier;
  const savedToken = req.session.oauthToken;
  const savedSecret = req.session.oauthSecret;

  if (!savedToken || !savedSecret || savedToken !== token) {
    res.status(400).render('error', { error: 'OAuth token is not known or invalid. Your request may have expire. Please renew the auth process.' });
    return;
  }

  // Build a temporary client to get access token
  const tempClient = new TwitterApi({ ...TOKENS, accessToken: token, accessSecret: savedSecret });

  // Ask for definitive access token
  const { accessToken, accessSecret, screenName, userId } = await tempClient.login(verifier);
  // You can store & use accessToken + accessSecret to create a new client and make API calls!
  req.session.accessToken=accessToken;
  req.session.accessSecret=accessSecret;
  //res.render('callback', { accessToken, accessSecret, screenName, userId });
  res.sendFile(path.join(__dirname,'..','..','views','index.html'))
}));


router.get('/aa', asyncWrapOrError(async (req, res) => {
  updateTokens(req);
  requestClient= new TwitterApi({ ...TOKENS });
  console.log('gettttinnnngggg....')
  text = await tweetFunctions.getLatest(requestClient)
  res.send(text)
}));

router.post('/',asyncWrapOrError(async function(req,res) {
  updateTokens(req);
  requestClient= new TwitterApi({ ...TOKENS });
  var text=req.body.text;
  await tweetFunctions.postTweet(text,requestClient,countThread=true);
  res.redirect('/');
}));
router.get('/au', asyncWrapOrError(async (req, res) => {
  updateTokens(req);
  requestClient= new TwitterApi({ ...TOKENS });
  text = await tweetFunctions.replyTweet(requestClient,'1519472395488272384','with *your . That was a typo, and this is a reply sent from the app. This is awesome')
  res.send(text)
}));




module.exports = router
//export default router;
