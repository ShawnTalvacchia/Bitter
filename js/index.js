let tweets;
async function getTweets() {
  const response = await fetch("https://api.myjson.com/bins/10ypnp");
  const jsonData = await response.json();
  tweets = JSON.parse(localStorage.getItem("tweets")) || jsonData["tweets"]; //
  console.log(tweets);
  renderTweets();
}

// let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
let inputField = document.getElementById("tweetInput");
let currentUser = "Anonymous";
let filter = "all";

function setLocalstorage(newTweets) {
  localStorage.setItem("tweets", JSON.stringify(newTweets));
}

// Create new tweet object
function newTweet(
  body,
  userName,
  createdAt,
  imgURL = "",
  isLiked = false,
  comments = []
) {
  return {
    body,
    userName,
    createdAt: moment(createdAt).format("YYYY-MM-DD HH:mm"),
    imgURL,
    isLiked,
    retweetCount: 0,
    comments
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
          <p> ${parseText(tweet.body)} </p>
          <div class="mb-3 mt-1">
            <small class="text-muted"> ${tweet.createdAt} </small>
          </div>
          <div class="tweet-buttons">
            <div>
              <button class="btn-sm btn btn-outline-dark" 
              onclick=toggle(${index})>${
    tweet.isLiked
      ? '<i class="fa fa-heart" aria-hidden="true"></i>'
      : '<i class="far fa-heart"></i>'
  }
              </button>
              <button class="btn-sm btn btn-dark" style="visibility: ${
                currentUser == "Anonymous" ? "hidden" : null
              }"
                    onclick=retweet(${index})>Retweet
              </button>
            </div>
            <button class="btn-sm btn btn-outline-danger" style="visibility: ${
              tweet.userName != currentUser ? "hidden" : null
            }" 
            onclick=deleteTweet(${index})>Remove
            </button>
          </div>
          <div class="input-group mt-3">
            <!-- <div class="input-group-prepend">
            <span class="input-group-text" ">${currentUser}</span>
            </div> -->
            <input type="text" class="form-control commentInput" onchange= "addComment(${index}, currentUser)" 
            placeholder="Comment">
          </div>
          <ul class="comments" style="padding:0">  
            <small> ${renderComment(index) || "No comment on this post"}</small>
          </ul>
        </div>
        </div>
        </li>
        `;
}

//Take tweet array, apply template to each element, put in HTML
function renderTweets() {
  let filtered;
  if (filter == "all") {
    filtered = tweets;
  } else {
    filtered = tweets.filter(tweet => tweet.body.includes(filter));
  }
  let tweetsList = filtered.map(renderSingleTweet);
  document.getElementById("tweets").innerHTML = tweetsList.join("");
  inputField.placeholder = `What is annoying you ${currentUser}?`;
  document.getElementById("clearFilter").innerHTML =
    '<button class="btn btn-dark rounded-pill mt-2" onclick="clearFilter()">Clear filter ⤾</button>';
  setLocalstorage(tweets);
}

function clearFilter() {
  filter = "all";
  renderTweets();
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

//Retweet function
function retweet(index) {
  let body = tweets[index].body;
  let author = `${currentUser} retweeted ${tweets[index].userName}`;
  tweets.splice(index + 1, 0, newTweet(body, author));
  tweets[index].retweetCount++;
  renderTweets();
}

// Reverse like or unlike tweets
function toggle(index) {
  tweets[index].isLiked = !tweets[index].isLiked;
  renderTweets();
}

function deleteTweet(index) {
  tweets.splice(index, tweets[index].retweetCount + 1);
  renderTweets();
}

// Comment function
function renderComment(index) {
  let commentsList = tweets[index].comments.map(comment => {
    return `
    <li style="border:none; margin: 0; padding: 5px 0 0 0"> 
    <span style="font-weight: bold"> ${comment.user} </span> 
    <span> said "${comment.body}" </span> 
    </li> `;
  });
  return commentsList.join("");
}

function addComment(index, user) {
  let comment = {
    body: document.querySelectorAll(".commentInput")[index].value,
    user
  };
  tweets[index].comments.unshift(comment);
  renderTweets();
  document.getElementsByClassName("commentInput")[index].value = "";
}

// Constantly update input length
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
  renderTweets();
}

// Change text with # or @ into clickable tags
function parseText(text) {
  let wordsArray = text.split(" ");
  return wordsArray
    .map(word => {
      if (word.startsWith("@")) return `<a class="tag" href="#">${word}</a>`;
      else if (word.startsWith("#"))
        return `<a class="hashtag" href="#">${word}</a>`;
      else return word;
    })
    .join(" ");
}

// For hashtags: onclick, filter tweets
document.body.addEventListener(
  "click",
  function(evt) {
    if (evt.target.className === "hashtag") {
      console.log(evt);
      filter = evt.target.text;
      renderTweets();
    }
  },
  false
);

getTweets();

//NewsFeed
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f6c3ae25887b49d4b108c546909dc4ca`;

async function getNews() {
  const response = await fetch(url)
  const jsonData = await response.json();

  console.log('jsonData', jsonData.articles[0])

  const newsHTML = jsonData.articles.slice(0,15).map(renderArticle);
  document.getElementById('newsList').innerHTML = newsHTML.join(' ')
}


function renderArticle(article) {
  if (article.author === null) return ''
return ` 
  <li>
    <div class="row">
      <div id="new-info"
        <h6 style="font-size:.8rem">${article.title}</h6> 
        <small class="text-muted"> ${moment(article.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</small>
      </div>
        <div id="new-img">
          <img src="${article.urlToImage}" alt="Card image cap">
          <a href="${article.url}"> 
          <small class="text-muted">${article.source.name}</small>  
          </a>
        </div>
    </div>
  </li>
  `
}

getNews()
