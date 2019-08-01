let tweets = [];
let inputField = document.getElementById("tweetInput");

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
  }</button>
    <button onclick="deleteTweet(${index})">x</button>
</li>
    `;
}

//Take tweet array, apply template to each element, put in HTML
function renderTweets() {
  let tweetsList = tweets.map(renderSingleTweet);
  document.getElementById("tweets").innerHTML = tweetsList.join("");
}

//Take input from user and create new tweet
function createTweet() {
  let tweetContent = inputField.value;
  let tweet = newTweet(tweetContent, "Quyen");
  tweets.push(tweet);
  renderTweets();
  inputField.value = "";
  updateLength();
}

// Reverse like or unlike tweets
function toggle(index) {
  tweets[index].isLiked = !tweets[index].isLiked;
  renderTweets();
}

function deleteTweet(index) {
  tweets.splice(index, 1);
  renderTweets();
}

function updateLength() {
  let tweetString = inputField.value.length;
  document.getElementById("tweetLength").innerHTML = 140 - tweetString;
}

document.getElementById("tweetInput").focus();
inputField.addEventListener("keyup", e => {
  updateLength();
  if (e.key === "Enter") {
    createTweet();
  }
});

// This function only fetches self-hardcoded data in myjson.
async function getData() {
  const response = await fetch('https://api.myjson.com/bins/9rrdh')
  const jsonData = await response.json()
//   const newsHTML = jsonData.articles.map(renderArticle)
//   console.log(jsonData.articles [0])
//   document.getElementById('newsList').innerHTML = newsHTML.join ('')
  console.log('Tweets', jsonData)
};
getData()

renderTweets();
