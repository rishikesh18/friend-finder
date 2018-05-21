// Dependencies
var path = require("path");
var friends=require("../app/data/friends.js");

// Displays a JSON of all possible friends
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
       res.json(friends);
  })

// New  friend entry in JSON input
app.post("/api/friends", function(req, res) {
  console.log(req.body)
  var bestfriend={
    name: "",
    photo: "",
    friendDifference: Infinity
  }
    
var newFriend = req.body;
var newFriendResponses = newFriend.scores;
var totdiff;//


//Goes through current friend list   
for (var i = 0; i < friends.length; i++) {
  var currentfrnd=friends[i];
    totdiff=0;
//   // Sorts new friends' scores and compares current and new lists
    for (var j = 0; j < currentfrnd.scores.length; j++) {
    var currentFriendScore = currentfrnd.scores[j];
    var currentUserScore = newFriendResponses[j];

// We calculate the difference between the scores and sum them into the totalDifference
  totdiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
  }

  if (totdiff <= bestfriend.friendDifference) {
    // Reset the bestfriend  to be the new friend.
    bestfriend.name = currentfrnd.name;
    bestfriend.photo = currentUserScore.photo;
    bestfriend.friendDifference = totdiff;
  }
}

friends.push(newFriend);

res.json(bestfriend );
  });
}