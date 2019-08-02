let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
let inputField = document.getElementById("tweetInput");
let currentUser = "Anonymous";

function setLocalstorage(newTweets) {
  localStorage.setItem("tweets", JSON.stringify(newTweets));
}

// Create new tweet object
function newTweet(body, userName, createdAt, imgURL = "", isLiked = false) {
  return {
    createdAt: moment(createdAt).format("YYYY-MM-DD HH:mm"),
    body,
    isLiked,
    userName,
    imgURL
  };
}

//Create template for tweet
function renderSingleTweet(tweet, index) {
  return `
  <li>
    <div class="row">  
      <div class="col avatar">
        <img id="avatar" src="img/GitHub-icon.png">
      </div>
      <div class="col-10">
        <h5> ${tweet.userName} </h5> 
        <p> ${tweet.body} </p>
        <div class="mb-3 mt-1">
          <small class="text-muted"> ${tweet.createdAt} </small>
        </div>
        <div class="tweet-buttons">
          <button class="btn-sm btn btn-outline-dark" 
                  onclick=toggle(${index})>${tweet.isLiked ? "Unlike" : "Like"}
          </button>
          <button class="btn-sm btn btn-outline-danger" 
                  onclick=deleteTweet(${index})>Remove
          </button>
        </div>
      </div>
    </div>
  </li>
    `;
}

//Take tweet array, apply template to each element, put in HTML
function renderTweets() {
  let tweetsList = tweets.map(renderSingleTweet);
  document.getElementById("tweets").innerHTML = tweetsList.join("");
  setLocalstorage(tweets);
}

//Take input from user and create new tweet
function createTweet() {
  let tweetContent = inputField.value;
  let tweet = newTweet(tweetContent, currentUser, moment()._d);
  tweets.unshift(tweet);
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
  if (e.key === "Enter") createTweet();
});

function changeUser() {
  currentUser = prompt("Who are you?");
}

renderTweets();
