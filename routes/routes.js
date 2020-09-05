var express = require("express");
var path = require("path");
var db = require("../models");
var router = express.Router();
const Sequelize = require("sequelize");

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

// window.location = "/score#"
 router.post("/api/game", function(req,res) {
     db.Player.create({
        name:  req.body.name,
        score : 100
     }).then(function (response) {
       //  res.redirect(307, "/game");
     res.json(response);
     })
     .catch(function(err) {
       res.status(500).json(err);
     });
   });

  


 router.put("/api/game" ,  function (req, res) {
      var idValue = req.body.id;
      var score = req.body.score;

     db.Player.update({score : score}, 
      {
         where: {
           id: idValue,
         },
       }).then(function (dbPost) {
         res.json(dbPost);
       });

   
});

          // var template = Handlebars.templates.example;
          // document.getElementById('output').innerHTML = template({doesWhat: 'rocks!'})

router.get("/score" ,  function (req, res) {
   
        db.Player.findAll({ limit: 10 , order : Sequelize.literal('id DESC') })
         
        .then(function (Player) {
        
          console.log(Player);
          res.render("end", {
            PlayerValues : Player
           
          });
      
        });

      });



module.exports = router;