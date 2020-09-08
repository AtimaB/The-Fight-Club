import Player from "./player.js";
import controls from "./controls.js";

var player;
window.onload = function () {
  const socket = io(),
    canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d");

  let players = [];
  socket.on("init", ({ id, plyrs }) => {

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
    //get id, name from URL
    let params = new URLSearchParams(window.location.search);
    let URLid = params.get('id')
    let URLname = params.get('name')

    //  console.log("URL id:"+URLid);
    //  console.log("URLName" +URLname);

    player = new Player({ id, w, h, img, x, y, type, playerCount, score, URLid, URLname });

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
      players[i].isMoving.right = obj.isMoving.right;
      players[i].isMoving.left = obj.isMoving.left;
      // players[i].isMoving.up = obj.isMoving.up;
      players[i].score = obj.score;
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
    }


    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      players.forEach((v) => v.draw(ctx, players, onAttack));

      requestAnimationFrame(draw);
    };

    draw();
  });
};
