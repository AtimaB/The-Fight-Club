
var express = require("express");
var path = require("path");
var router = express.Router();

var pathForindexFile = path.join(__dirname, '../views/index.html');
var pathForWelcomeFile = path.join(__dirname, '../views/welcome.html');
// Import the model (burger.js) to use its database functions.
// var burger = require("../models/.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {

  var object = {
    highscore: 50
  };

   res.sendFile(pathForWelcomeFile);
});

router.get("/game", function(req, res) {
  
 res.sendFile(pathForindexFile);
});

router.put("/api/game/:id", function(req, res) {
    
   
});



// Export routes for server.js to use.
module.exports = router;
