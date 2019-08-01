let tweets = [];
let inputField = document.getElementById("tweetInput");

<<<<<<< HEAD
// Create new tweet object
function newTweet(body, userName, isLiked = false) {
  return {
    body,
    isLiked,
    userName
  };
}

tweets.push(newTweet("hello", (userName = "Mai")));
tweets.push(newTweet("Twitter", (userName = "Quyen")));
tweets.push(newTweet("Mai", (userName = "Shawn")));
tweets.push(newTweet("Hello again", (userName = "Parsa")));

//Create template for tweet
function renderSingleTweet(tweet, index) {
  return `
  <li>
    <h2> ${tweet.userName} </h2> 
    <p> ${tweet.body} </p>
    <button class="btn btn-sm btn-outline-success complete" onclick=toggle(${index})>${
    tweet.isLiked ? "Unlike" : "Like"
  }</button> ${tweet.isLiked}
</li>
    `;
}

//Take tweet array, apply template to each element, put in HTML
=======
//Create Template for Tweet
function renderSingleTweet(tweet) {
  return `${tweet.body}`;
}
//Take tweet array, apply template, put in HTML
>>>>>>> 3ba294cce53cf3175c3a0cb83fde1af1c3ee09a4
function renderTweets() {
  let tweetsList = tweets.map(renderSingleTweet);
  document.getElementById("tweets").innerHTML = tweetsList.join("");
}

<<<<<<< HEAD
//Take input from user and create new tweet
=======
//Take input from user
>>>>>>> 3ba294cce53cf3175c3a0cb83fde1af1c3ee09a4
function createTweet() {
  let tweetContent = inputField.value;
  let tweet = newTweet(tweetContent, "Quyen");
  tweets.push(tweet);
  renderTweets();
  inputField.value = "";
  updateLength();
}

function toggle(index) {
  tweets[index].isLiked = !tweets[index].isLiked;
  renderTweets();
}

function updateLength() {
  let tweetString = inputField.value.length;
  document.getElementById("tweetLength").innerHTML = 140 - tweetString;
}

document.getElementById("tweetInput").focus();
inputField.addEventListener("keyup", updateLength());

renderTweets();
