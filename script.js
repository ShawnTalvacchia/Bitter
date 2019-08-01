let tweets = [{ body: "Hello" }];

//Create Template for Tweet
function renderSingleTweet(tweet) {
  return `${tweet.body}`;
}
//Take tweet array, apply template, put in HTML
function renderTweets() {
  let tweetsList = tweets.map(renderSingleTweet);
  document.getElementById("tweets").innerHTML = tweetsList;
}

//Take input from user
function createTweet() {
  let tweet = {};
  let tweetContent = document.getElementById("tweetInput").value;
  tweet.body = tweetContent;
  tweets.push(tweet);
  renderTweets();
}
renderTweets();
