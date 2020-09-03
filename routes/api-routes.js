var db = require("../models");
// var passport = require("../config/passport");

module.exports = function(app) {
  
  app.post("", function(req, res) {
    db.User.create({
      
    })
      .then(function() {
        // res.redirect(307, "/api/login");
      })
      .catch(function(err) {
       
      });
  });

  // Route for logging user out
  app.get("", function(req, res) {
    // req.logout();
    // res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("", function(req, res) {
 
    
  });
};
