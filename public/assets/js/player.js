class Player {

  constructor({ id, w = 450, h = 500, img, x, y, type, playerCount, score = 100, URLid, URLname }) {
    this.type = type;

    this.img = img;
    this.playerCount = playerCount;
    this.id = id;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.isMoving = {};
    this.steps = 0;
    this.score = score;
    this.URLid = URLid;
    this.URLname = URLname;
  }


  draw(ctx, players, onAttack) {

    var myMusic = document.getElementById("audio1");

    var endMusic = document.getElementById("endaudio");

    var gameoverMusic = document.getElementById("gameoveraudio");
    myMusic.play();

    if (this.playerCount % 2 === 0) {
      this.w = 250;
      this.img = document.getElementById("source");
    } else {
      this.img = document.getElementById("source1");
    }


    if (this.score < 0) {
      if (this.playerCount % 2 === 0) {
        // this.w=250;
        this.img = document.getElementById("dieR-2");

      } else {
        this.img = document.getElementById("dieG-2");

      }

      myMusic.pause();
      // myMusic.src = '';
      gameoverMusic.play();

      ctx.font = "100px Arial";

      var txt = "Game Over";
      var x = 880;
      var y = 450;
      var lineheight = 55;
      var lines = txt.split("\n");

      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * lineheight);
      }

      window.location.replace("/score");

    }

    if (this.isMoving.right) {


      this.steps++;
      this.x += this.speed;
      let frame = Math.floor(this.steps / 10) % 3;
      if (this.playerCount % 2 === 0) {
        this.w = 450;
        this.img = document.getElementById('moving-' + frame);

      } else {

        this.img = document.getElementById('moving1-' + frame);

      }
    }
    if (this.isMoving.left) {

      this.steps++;
      this.x -= this.speed;
      let frame = Math.floor(this.steps / 10) % 3;
      if (this.playerCount % 2 === 0) {
        this.w = 250;
        this.img = document.getElementById('moving-' + frame);


      } else {
        this.img = document.getElementById('moving1-' + frame);
      }
    }


    if (this.isMoving.up) {

      var myPunch = document.getElementById('sound');
      myPunch.play();
      var crash;

      for (var i = 0; i < players.length; i++) {
        if (this.id !== players[i].id && isCollide(this, players[i], 0)) {
          crash = this.crashWith(players[i]);

          if (crash) {

            players[i].score = players[i].score - 0.02;
            onAttack(players[i]);

            console.log("players[i].URLid" + players[i].URLid + " players[i].URLid" + players[i].URLid);
            $.ajax("/api/game", {
              type: "PUT",
              data: { id: players[i].URLid, name: players[i].URLname, score: players[i].score },

            }).then(
              function () {
              }
            );

          }
        }
      }

      if (this.playerCount % 2 === 0) {
        this.w = 450;
        this.img = document.getElementById("attack");
      } else {
        this.img = document.getElementById("attack1");

      }

    }

    if (this.isMoving.down) {


      if (this.playerCount % 2 === 0) {
        // this.w=250;
        this.img = document.getElementById("defend");
      } else {
        // this.w=250;
        this.img = document.getElementById("defend1");
      }

    }

    if (this.isMoving.shift) {
      var myPunch = document.getElementById("sound");
      myPunch.play();

      for (var i = 0; i < players.length; i++) {
        if (this.id !== players[i].id && isCollide(this, players[i], 0)) {
          var crash = this.crashWith(players[i]);


          if (crash) {

            players[i].score = players[i].score - 0.02;

            onAttack(players[i]);

            $.ajax("/api/game", {
              type: "PUT",
              data: { id: players[i].URLid, name: players[i].URLname, score: players[i].score },

            }).then(
              function () {

              }
            );
          }
        }
      }

      if (this.playerCount % 2 === 0) {
        this.w = 450;
        this.img = document.getElementById("attackumb");
      } else {
        this.img = document.getElementById("attackumb1");
      }
    }

    this.x = Math.min(this.x, 1700 - this.w);
    this.y = Math.min(this.y, 1000 - this.h);

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    var txt;

    var score;
    ctx.font = "50px Arial";
    if (this.score < 0) {
      score = 0;
    } else {
      score = Math.floor(this.score);
    }
    txt = "Player: " + (this.playerCount + 1) + "\nScore: " + score;

    var x = 100;
    var y = 80;
    var lineheight = 55;
    var lines = txt.split("\n");

    if (this.playerCount === 0) {

      // x=x+100;

    } else if (this.playerCount === 1) {
      x = x + 250;
      y = 80;

    } else if (this.playerCount === 2) {
      x = x + 500;
      y = 80;
    } else if (this.playerCount === 3) {
      x = x + 750;
    } else if (this.playerCount === 4) {
      x = x + 1000;

    } else if (this.playerCount === 5) {
      x = x + 1250;

    } else if (this.playerCount === 6) {
      x = x + 1500;
    } else {
      x = 100;
      y = 160;
    }

    for (var i = 0; i < lines.length; i++)
      ctx.fillText(lines[i], x, y + i * lineheight);

  }

  move(dir) {
    this.isMoving[dir] = true;
  }

  stop(dir) {
    this.isMoving[dir] = false;
  }

  crashWith(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.w;
    var mytop = this.y;
    var mybottom = this.y + this.h;
    // console.log(
    //   "My obj: Left: " +
    //     myleft +
    //     "Right: " +
    //     myright +
    //     "Top: " +
    //     mytop +
    //     "Bottom" +
    //     mybottom
    // );
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.w;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.h;
    // console.log(
    //   "Other obj: Left: " +
    //     otherleft +
    //     "Right: " +
    //     otherright +
    //     "Top: " +
    //     othertop +
    //     "Bottom" +
    //     otherbottom
    // );
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  }

}

function isCollide(a, b, m = 180) {
  return !(a.x + a.w - m < b.x || a.x > b.x + b.w - m);
}

export default Player;  
