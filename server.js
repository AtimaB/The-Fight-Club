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
const players = [];
io.on("connection", function (socket) {
console.log("socket connected" +socket);
// joinGame(socket);
// socket.emit("position", position);
socket.emit('init',{id: socket.id , plyrs : players});

  //Listening for the new player... like server listening for the req from client
  socket.on("new-player" , obj => {
  players.push(obj);
  if(!players.length === 2){
    
  }
  socket.broadcast.emit("new-player" , obj)
  });
  
  socket.on("move-player" , dir => socket.broadcast.emit("move-player" , {id: socket.id, dir}));
  socket.on("stop-player" , dir => socket.broadcast.emit("stop-player" , {id: socket.id, dir}));

});


http.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
