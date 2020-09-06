import Player from "./player.js";
import controls from "./controls.js";
// import PlayerAll from "./playerClass.js";
// const Player = require("Player.js");
var player;
window.onload = function () {
  const socket = io(),
    canvas = document.getElementById("game"),
    // console.log(canvas),
    ctx = canvas.getContext("2d");

  // const writeToCanvas = msg => {
  //     ctx.fillStyle = "black";
  //     ctx.font = "20px";
  //     ctx.fillText(msg , 30, 30);

  // }
  // var img = '../assets/images/char3.png';
  //        img.src =

  let players = [];
  let count = 0;
  socket.on("init", ({ id, plyrs, playerIndex }) => {
    // const player = new Player({ id });
    // socket.emit()
    // writeToCanvas("Connected");
    let type = "image";
    let w;
    let h;
    let x;
    let y;
    let img;
    let score;
    let playerCount = plyrs.length;
    console.log(playerCount);
    if (playerCount % 2 === 0) {
      x = 80;
      y = 600;
    } else {
      x = 1400;
      y = 600;
    }
       // parse name from player
       let params = new URLSearchParams(window.location.search);
       let URLid = params.get('id') // 'chrome-instant'
       let URLname = params.get('name') 

       console.log("URL id:"+URLid);
       console.log("URLName" +URLname);
    
   player = new Player({ id, w, h, img, x, y, type, playerCount, score, URLid, URLname });
  //  new PlayerAll({id});
    // console.log(plyrs.length);

    // if(playerCount === 2){
    //   socket.emit("disconnect", player);
    // }
    controls(player, socket);
    socket.emit("new-player", player);
    //This especially runs on other machines...
    socket.on("new-player", (obj) => {
      // console.log("newplayer")
      // console.log(id)
      players.push(new Player(obj));
    });
    players = plyrs.map((v) => new Player(v)).concat(player);

    socket.on("move-player", ({ id, dir }) => {
      // console.log("move-player");
      // console.log(id);
      // console.log(dir);
      let p = players.find((v) => v.id === id);
      // console.log(p);
      p.move(dir);

      draw();
    });
    socket.on("update-player", ({ obj }) => {
      let i = players.findIndex((p) => p.id === obj.id);
      if (i < 0) {
        return;
      }
      players[i].x = obj.x;
      players[i].y = obj.y;
      players[i].score = obj.score;
      players[i].steps = obj.steps;
      draw();
    });
    console.log(players);
    socket.on("stop-player", ({ id, dir }) => {
      players.find((v) => v.id === id).stop(dir);
      draw();
    });
    socket.on("remove-player", ({ id }) => {
      let i = players.findIndex((v) => v.id === id);
      // console.log("remove " + i);
      players.splice(i, 1);
      draw();
    });
 

    const onAttack = (attacked) => {
      socket.emit("update-player", attacked);

      // if(attacked.score<0){
      // let params = new URLSearchParams(window.location.search);
      // let URLid = params.get('id') // 'chrome-instant'
      // let URLname = params.get('name') // 'mdn query string'
      //  console.log(URLid);
      //  console.log(URLname)
     
     
      // $.ajax("/api/game", {
      //       type: "PUT",
      //       data: {id: URLid, name: URLname, score: this.score},
    
      //     }).then(
      //       function() {
      //         window.location.replace("/score");
      //       }
      //     );
      // }
        
    }


    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      players.forEach((v) => v.draw(ctx, players, onAttack));

      requestAnimationFrame(draw);
    };

    draw();
  });
};

// module.exports.player;  