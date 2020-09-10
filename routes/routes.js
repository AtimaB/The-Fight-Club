var express = require("express");
var path = require("path");
var moment = require("moment");
var db = require("../models");
var router = express.Router();
const Sequelize = require("sequelize");

var pathForindexFile = path.join(__dirname, '../views/index.html');
var pathForWelcomeFile = path.join(__dirname, '../views/welcome.html');

router.get("/", function(req, res) {
  console.log(new Date());
  var threeMinuteAgo = new Date( Date.now() - 1000 * 180 );
  console.log(threeMinuteAgo);
  db.Player.findAll({
     
       where: {
        updatedAt:  {        
        $lt:threeMinuteAgo,
        }
       },

     }).then(function (dbPost) {
      console.log(dbPost);
     });

   res.sendFile(pathForWelcomeFile);
});

router.get("/game", function(req, res) {
  
    res.sendFile(pathForindexFile);
   });

 router.post("/api/game", function(req,res) {
  db.Player.count({
    where: {
      activeState: 1
    }
 })
        
 .then(function (PlayerStateCount) {
 
   console.log("Player Active State" +PlayerStateCount);

try{
    if(PlayerStateCount<2){
      
        db.Player.create({
            name:  req.body.name,
            score : 200,
            activeState : 1,
            playerUUID : uuidv4(),
            time: new Date()
        }).then(function (response) {
          res.json(response);
        })
        .catch(function(err) {
          res.status(500).json({"error" : 'Please enter your name!!'});
        });
      }
    }catch{
        throw new Error('Game is already in Progress. Please wait for 2 minutes. Thank you!!!');
        }

 });

});

   function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  


 router.put("/api/game" ,  function (req, res) {
      var idValue = req.body.id;
      var nameValue = req.body.name;
      var score = req.body.score;

      if(score<0){
        score = 0;
      }

      if(score<10){
       
        db.Player.update({
          activeState: 0,
         
         },
            {
             where: {
               activeState:1
             
             },
   
           }).then(function (dbPost) {
            
           });

       
      }

      db.Player.update({
        score : score, 
       
      },
         {
          where: {
            playerUUID: idValue,
            name: nameValue,
          
          },

        }).then(function (dbPost) {
          res.json(dbPost);
        });

   
});

router.get("/score" ,  function (req, res) {

var maximumScore; 
        db.Player.findAll({
          attributes: [[Sequelize.fn('max', Sequelize.col('score')), 'maxScore']],
         
        }) .then(function (Player) {
          maximumScore = Player;

        });
   
        db.Player.findAll({ limit: 6 , order : Sequelize.literal('id DESC') })
         
        .then(function (Player) {
          res.render("end", {
            PlayerValues : Player,
            HighscoreValue : maximumScore
           
          });
      
        });

    });

module.exports = router;