var express = require("express");
var path = require("path");
var db = require("../models");
var router = express.Router();

var pathForindexFile = path.join(__dirname, '../views/index.html');
var pathForWelcomeFile = path.join(__dirname, '../views/welcome.html');
// Import the model (burger.js) to use its database functions.
// var burger = require("../models/.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {

   res.sendFile(pathForWelcomeFile);
});

router.get("/game", function(req, res) {
  
    res.sendFile(pathForindexFile);
   });


router.post("/api/game", function(req,res) {
    db.Player.create({
       name:  req.body.name,
       score : 100
    }).then(function () {
       res.redirect(307, "/game");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
  });

  


router.put("/api/game/:player:score", function (req, res) {
    var player = req.params.player;
    var score = req.params.score;

    db.Post.update(req.body, {
        where: {
          id: req.body.id,
        },
      }).then(function (dbPost) {
        res.json(dbPost);
      });
});




router.put("/api/game/:id", function(req, res) {
    
   
});

module.exports = router;