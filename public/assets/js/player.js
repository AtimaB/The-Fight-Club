class Player {

  constructor({ id, w = 450, h = 500, img, x, y, type, playerCount, score=100}) {
    this.type = type;
    //  if (type == "image") {
    //    this.image = new Image();
    //    this.image.src = color;
    //  }
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
    this.score= score;
    this.die=0;
  }
  draw(ctx, players) {
        
   var playerNo;
  
   var score;

    if (this.playerCount % 2 === 0) {
      this.img = document.getElementById("source");
    } else {
      this.img = document.getElementById("source1");
    }

    //  for(var i=0; i<players.length; i++){
    //    if(this.id !== players[i].id && isCollide(this, players[i])) {
    //      var crash = this.crashWith(players[i]);
    //      console.log("Touch" +crash);
    //    }

    //  }
    if (this.isMoving.right) {

      this.x += this.speed;
 
       this.steps++;
      
      let frame = Math.floor(this.steps/10)%3;
      // console.log(frame);
      if (this.playerCount % 2 === 0) {
        // this.img = document.getElementById('moving');
        // this.x += this.speed;
        this.img = document.getElementById('moving-'+frame);
       

      } else {
        // this.img = document.getElementById('moving1');
        this.img = document.getElementById('moving1-'+frame);

      }
    }
    if (this.isMoving.left) {
      this.x -= this.speed;
      this.steps++;
      let frame = Math.floor(this.steps/10)%3;
      if (this.playerCount % 2 === 0) {
        // this.img = document.getElementById('moving');
        this.img = document.getElementById('moving-'+frame);


      } else {
        // this.img = document.getElementById('moving1');
        this.img = document.getElementById('moving1-'+frame);
      }
    }


    if (this.isMoving.up) {
   
      var myPunch = document.getElementById('sound');
      myPunch.play();
      var crash;
      this.die++;
     
      for(var i=0; i<players.length; i++){
        if(this.id !== players[i].id && isCollide(this, players[i], 0)) {
        crash = this.crashWith(players[i]);
    
        if(crash) {

         players[i].score = players[i].score-2;
         console.log("Player:" +(players[i].playerCount+1)+ "Score:" +   players[i].score);
         playerNo = (players[i].playerCount+1);
         score = players[i].score
        //  playerNo =  (players[i].playerCount+1);
        //   playScore = players[i].score;
        //  if(playerNo === 1){
        //  txt = "Player : "+(playerNo)+"\n Score : "+playScore+"";
        //  }else if(playerNo === 2){
        //    txt1 = "Player : "+(playerNo)+"\n Score : "+playScore+"";
        //  }
  
        }
        }
      }

      if (this.playerCount % 2 === 0) {
        // var crashVal = 0;
        this.img = document.getElementById("attack");
      } else {
        this.img = document.getElementById("attack1");
      
      }

    }

    if (this.isMoving.down) {
      if (this.playerCount % 2 === 0) {
        this.img = document.getElementById("defend");
      } else {
        this.img = document.getElementById("defend1");
      }
    }

    if (this.isMoving.shift) {
      var myPunch = document.getElementById("sound");
      myPunch.play();

      for(var i=0; i<players.length; i++){
        if(this.id !== players[i].id && isCollide(this, players[i], 0)) {
          var crash = this.crashWith(players[i]);
          console.log("Umbrella punch" + crash);

          if(crash) {

            players[i].score = players[i].score-2;
            console.log("Player:" +(players[i].playerCount+1)+ "Score:" +   players[i].score);
            playerNo = (players[i].playerCount+1);
            score = players[i].score
          }
        }
      }

      if (this.playerCount % 2 === 0) {
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

    // ctx.beginPath();

    if(score<0){

    // let frame = Math.floor(this.die/10)%3;
    if(playerNo === 1){
    console.log("Player " +playerNo+" is dead"); // is working
    this.img = document.getElementById("dieR3");
    // return window.location = "/api/game#" +players[i] +score;

    }else {
      console.log("Player " +playerNo+" is dead"); //is working
      this.img = document.getElementById("dieG3");
      // return window.location = "/api/game#" +players[i] +score;

    }

   
    console.log("Oh no I'm dead");

    ctx.font = "100px Arial";
    
    var txt = "Game Over";
    var x = 880;
    var y = 450;
    var lineheight = 55;
    var lines = txt.split("\n");


    for (var i = 0; i < lines.length; i++)
      ctx.fillText(lines[i], x, y + i * lineheight);

      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);


  }

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      var txt;
      var txt1;
      ctx.font = "50px Arial";
      //  console.log(ctx);
      if(playerNo=== 1){
       txt = "Player: " +playerNo+ "\n Score: " + score;
       }else{
        txt = "Player: " +1+ "\n Score: " + this.score;
      }
      var x = 100;
      var y = 80;
      var lineheight = 55;
      var lines = txt.split("\n");

      for (var i = 0; i < lines.length; i++)
        ctx.fillText(lines[i], x, y + i * lineheight);

        if(playerNo === 2){
           txt1 = "Player: " +playerNo+ "\n Score: " + score;
           }else{
            txt1 = "Player: " +2+ "\n Score: " + this.score;
          }
      var x1 = 1400;
      var y1 = 80;
      var lines1 = txt1.split("\n");

      for (var i = 0; i < lines1.length; i++)
        ctx.fillText(lines1[i], x1, y1 + i * lineheight);


       //if(end){
      // ctx.
      // }
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
    console.log(
      "My obj: Left: " +
        myleft +
        "Right: " +
        myright +
        "Top: " +
        mytop +
        "Bottom" +
        mybottom
    );
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.w;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.h;
    console.log(
      "Other obj: Left: " +
        otherleft +
        "Right: " +
        otherright +
        "Top: " +
        othertop +
        "Bottom" +
        otherbottom
    );
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

  //  eventCollision(e){
  //   // var elem        = e.target;
  //   console.log("Im inside the event listener fn");
  //   console.log("Event" +e);
  //   // console.log("elem" +elem);
  //   var char = document.getElementById('source');
  //   var char2 = document.getElementById('source1');
  //   var elem        = e.target;
  //   console.log("Event" +e);
  //   console.log("elem" +elem);
  //   elemOffset  = elem.getBoundingClientRect();
  //   elemDisplay = elem.style.display;

  // }
}

function isCollide(a, b, m = 180) {
  return !(a.x + a.w - m < b.x || a.x > b.x + b.w - m);
}

function printScore(player, ctx){
  // return;
           // affectedPerson = players[i];
           ctx.font = "50px Arial";
           // console.log(ctx);
           var txt =  ctx.font = "50px Arial";
           // console.log(ctx);
           var txt =   player+"\n Score : "+  player.score+"";
           var x = 100;
           var y = 80;
           var lineheight = 55;
           var lines = txt.split("\n");
 
           for (var i = 0; i < lines.length; i++)
             ctx.fillText(lines[i], x, y + i * lineheight);
 
           var txt1 =   player+"\n Score : "+  player.score+"";
           var x1 = 1400;
           var y1 = 80;
           var lines1 = txt1.split("\n");
 
           for (var i = 0; i < lines1.length; i++)
             ctx.fillText(lines1[i], x1, y1 + i * lineheight);
 
     }

function calcScore(playerGotAttack){
  playerGotAttack.score = playerGotAttack.score-2;
  console.log("Player:" +(playerGotAttack.playerCount+1)+ "Score:" +  playerGotAttack.score);
  return playerGotAttack.score;

}

export default Player;  
