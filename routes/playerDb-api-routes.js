var db = require("../models");

module.exports = function (app) {
  app.get("/api/playerDb", function (req, res) {
    db.Player.findAll({
      include: [db.Post],
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  app.get("/api/playerDb/:id", function (req, res) {
    db.Player.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Post],
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  app.post("/api/playerDb", function (req, res) {
    db.Player.create(req.body).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  app.delete("/api/playerDb/:id", function (req, res) {
    db.Player.destory({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });
};
