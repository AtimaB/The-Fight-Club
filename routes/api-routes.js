var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");

var pathForindexFile = path.join(__dirname, '../views/index.html');
var pathForWelcomeFile = path.join(__dirname, '../views/welcome.html');
// Import the model (burger.js) to use its database functions.
// var burger = require("../models/.js");

// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {

    //console.log(__dirname);
    //console.log(req.body.name);

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

    

router.put("/api/game/:id", function (req, res) {});
    }


