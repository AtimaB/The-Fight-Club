var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
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

app.use(routes);

io.sockets.on("connection", function (socket) {
  console.log("socket connected")
socket.emit('connect',{msg:"hello"})
// socket.emit("position", position);
joinGame(socket);

if (getOpponent(socket)) {
  socket.emit("game.begin", {
    symbol: players[socket.id].symbol,
  });
  getOpponent(socket).emit("game.begin", {
    symbol: players[getOpponent(socket).id].symbol,
  });
}

// socket.on("make.move", function (data) {
//   if (!getOpponent(socket)) {
//     return;
//   }
//   socket.emit("move.made", data);
//   getOpponent(socket).emit("move.made", data);
// });

socket.on("disconnect", function () {
  if (getOpponent(socket)) {
    getOpponent(socket).emit("opponent.left");
  }
});
});

function joinGame(socket) {
players[socket.id] = {
  opponent: unmatched,

  // symbol: "X",
  // The socket that is associated with this player
  socket: socket,
};
if (unmatched) {
  // players[socket.id].symbol = "O";
  players[unmatched].opponent = socket.id;
  unmatched = null;
} else {
  unmatched = socket.id;
}
}

function getOpponent(socket) {
if (!players[socket.id].opponent) {
  return;
}
return players[players[socket.id].opponent].socket;
}


http.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
