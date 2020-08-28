var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
// http.listen(PORT);
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// app.use(express.static("views/Images"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/gameController.js");
const { log } = require("console");

app.use(routes);
const players = [];
const sockets = {}
io.on("connection", function (socket) {
  console.log("socket connected" + socket);
  // joinGame(socket);
  // socket.emit("position", position);
  socket.emit("init", { id: socket.id, plyrs: players });

  //Listening for the new player... like server listening for the req from client
  socket.on("new-player", (obj) => {
    if(sockets[obj.id]) {
      return;
    }
    console.log("new-player" );
    console.log(obj);
    players.push(obj);
    socket.broadcast.emit("new-player", obj);
  });

  socket.on("update-player", (obj) => {
    let i = players.findIndex(p => p.id === obj.id);
    if(i < 0) {
      return;
    }
    players[i] = obj;
    console.log("update-player" );
    console.log(obj);
    return socket.broadcast.emit("update-player", { obj })
  });
  socket.on("move-player", (dir) => {
    console.log("move-player" );
    console.log(dir);
    return socket.broadcast.emit("move-player", { id: socket.id, dir })
  });
  socket.on("stop-player", (dir) => {
    console.log("stop-player" );
    console.log(dir);
    return socket.broadcast.emit("stop-player", { id: socket.id, dir })
  });
  socket.on('disconnect', function () {
    var i = players.findIndex(p => p.id === socket.id);
    console.log("remove " + i + " " + socket);
    players.splice(i, 1);
    return socket.broadcast.emit("remove-player", {id: socket.id})
  });
});

http.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});