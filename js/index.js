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
}

//Take input from user and create new tweet
function createTweet() {
  let tweetContent = inputField.value;
  let tweet = newTweet(tweetContent, "Quyen");
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
  if (e.key === "Enter") {
    createTweet();
  }
});

renderTweets();
