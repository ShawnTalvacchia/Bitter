let tweets = [];
let inputField = document.getElementById("tweetInput");
let currentUser = "Anonymous";

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

tweets.push(newTweet("Come on inner peace, I don't have all day!", "Mai"));
tweets.push(newTweet("Team work makes the dream work", "Quyen"));
tweets.push(newTweet("canceling plans is ok. staying home to cook is ok. disappearing for a bit to get your life together is ok. resurfacing in a foreign country with a new name 10 years later is ok. it's called self care", "Shawn"));
tweets.push(newTweet("Me: ok, just breathe and relax. <br> Brain: OR WE COULD TRY AND FIGURE OUT THE EXACT MOMENT ALL YOUR HOPES AND DREAMS DIED", "Parsa"));

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
                  onclick=toggle(${index})>${tweet.isLiked ? '<i class="fa fa-heart" aria-hidden="true"></i>' : '<i class="far fa-heart"></i>' }
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
}

//Take input from user and create new tweet
function createTweet() {
  let tweetContent = inputField.value;
  let tweet = newTweet(tweetContent, currentUser, moment()._d);
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
  if (e.key === "Enter") createTweet();
});

function changeUser() {
  currentUser = prompt("Who are you?");
}

renderTweets();

let url= 'https://newsapi.org/v2/top-headlines?country=us&apiKey=7a557050c3b9423599354c66f5211288'

async function getNews() {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=7a557050c3b9423599354c66f5211288')
    const jsonData = await response.json()
    const newsHTML = jsonData.articles.map(renderArticle)
    console.log(jsonData.articles [0])
    document.getElementById('newsList').innerHTML = newsHTML.join ('')
    console.log('Latest news', jsonData.title)
  };
  getNews()
