let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
let inputField = document.getElementById("tweetInput");
var currentUser = "Anonymous";

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
    createdAt: moment(createdAt).format("YYYY-MM-DD HH:mm"),
    body,
    isLiked,
    userName,
    imgURL,
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
        <button class="btn-sm btn btn-outline-dark" 
                  onclick=toggle(${index})>${
    tweet.isLiked
      ? '<i class="fa fa-heart" aria-hidden="true"></i>'
      : '<i class="far fa-heart"></i>'
  }
          </button>
          <button class="btn-sm btn btn-outline-danger" 
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

// Comment function
function renderComment(index) {
  let commentsList = tweets[index].comments.map(comment => {
    return `
    <li style="border:none; margin: 0; padding: 10px 0 0 0"> 
      <span style="font-weight: bold"> ${comment.user} </span> 
      <span> said ${comment.body} </span> 
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
        return `<a class="tag" href="#">${word}</a>`;
      else return word;
    })
    .join(" ");
}

// For tags: onclick, filter tweets
document.body.addEventListener(
  "click",
  function(evt) {
    if (evt.target.className === "tag") {
      alert(this);
    }
  },
  false
);

renderTweets();

let url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=7a557050c3b9423599354c66f5211288";

async function getNews() {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=7a557050c3b9423599354c66f5211288"
  );
  const jsonData = await response.json();
  const newsHTML = jsonData.articles.map(renderArticle);
  console.log(jsonData.articles[0]);
  document.getElementById("newsList").innerHTML = newsHTML.join("");
  console.log("Latest news", jsonData.title);
}
// getNews();
