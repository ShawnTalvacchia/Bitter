let tweets = [{ body: "Hello" }];

function renderSingleTweet(tweet) {
  return `${tweet.body}`;
}

function renderTweets() {
  let tweetsList = tweets.map(renderSingleTweet);
  document.getElementById("tweets").innerHTML = tweetsList;
}

function createTweet() {
  let tweet = {};
  let tweetContent = document.getElementById("tweetInput").value;
  tweet.body = tweetContent;
  tweets.push(tweet);
  renderTweets();
}
renderTweets();
