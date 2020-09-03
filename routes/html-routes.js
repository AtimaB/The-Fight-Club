var path = require("path");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/main", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
  });

  app.get("/end", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/end.handlebars"));
  });
};
