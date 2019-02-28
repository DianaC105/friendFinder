// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsArray = require("../data/friends");
var path = require ("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

 

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware

    var userData =req.body;
    var totalDifference =1000;
    var newFriend = userData.scores;
    var matchName =" ";


    // loop thru friendsArray first - this will look thru the existing user and new friend 
    

    for (var i = 0; i < friendsArray.length; i++){
      diff= 0;
    
    for (var j = 0; j < newFriend.length; j++){
    //finding the difference between the answers of friend and New friend 
      diff += Math.abs(friendsArray[i].scores-newFriend[j])
    };
    // pushing the different between the scores of the data 
    //userData.push(diff);

    if (diff < totalDifference){
      totalDifference= diff 
      matchName =friendsArray[i].name
    }
    // put new friend into the friendsArray 
   friendsArray.push(userData);

   res.json(matchName);

  }
  })
  }