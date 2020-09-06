class Player {

  constructor({ id, w = 450, h = 500, img, x, y, type, playerCount, score=100, URLid, URLname}) {
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
    this.score= score;
    this.die=0;
    this.URLid =URLid;
    this.URLname = URLname;
  }

  
  draw(ctx, players, onAttack) {
       
  //  var score;

    if (this.playerCount % 2 === 0) {
      this.img = document.getElementById("source");
    } else {
      this.img = document.getElementById("source1");
    }
   

     if(this.score<0){
      if (this.playerCount % 2 === 0) {
        this.img = document.getElementById("dieR-2");
       
      } else {
        this.img = document.getElementById("dieG-2");
       
      }

      ctx.font = "100px Arial";
      
         var txt = "Game Over";
         var x = 880;
         var y = 450;
         var lineheight = 55;
         var lines = txt.split("\n");
    
        //  this.score = 0;
    
         for (var i = 0; i < lines.length; i++){
           ctx.fillText(lines[i], x, y + i * lineheight);
         }

         window.location.replace("/score");
      // console.log(window.location);
        //  var URLid = window.location.search.match(new RegExp('\?id\=([a-zA-Z0-9\-]+)'))[1];
        //  var URLname =   window.location.search.match(new RegExp('[&]' + name + '=([^&]+)'))[2];
        //  let params = new URLSearchParams(window.location.search);
        //  let URLid = params.get('id') // 'chrome-instant'
        //  let URLname = params.get('name') // 'mdn query string'
        //   console.log(URLid);
        //   console.log(URLname)
        
        
        //  $.ajax("/api/game", {
        //        type: "PUT",
        //        data: {id: URLid, name: URLname, score: this.score},
       
        //      }).then(
        //        function() {
        //          window.location.replace("/score");
        //        }
        //      );
           
          }
         
        
    // }
 

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

            players[i].score = players[i].score-0.2;
            onAttack(players[i]);
    
            // let params = new URLSearchParams(window.location.search);
            // let URLid = params.get('id') // 'chrome-instant'
            // let URLname = params.get('name')  //'mdn query string'
            // console.log("URL id" +URLid);
            // console.log("URL Name" +URLname);
            console.log("players[i].URLid" +players[i].URLid+  " players[i].URLid" +players[i].URLid);
            $.ajax("/api/game", {
                type: "PUT",
                data: {id: players[i].URLid, name: players[i].URLname, score: players[i].score},
        
              }).then(
                function() {
                }
              );
            // if (players[i].score < 0) {
            //   window.location.replace("/score");
            // }
    
          //  console.log("Player:" +(players[i].playerCount+1)+ "Score:" +   players[i].score);
          }
        }
      }

      if (this.playerCount % 2 === 0) {
      
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
       

          if(crash) {

            players[i].score = players[i].score-0.2;
           
            onAttack(players[i]);
            
              //  let params = new URLSearchParams(window.location.search);
              //  let URLid = params.get('id')  //'chrome-instant'
              //  let URLname = params.get('name')  //'mdn query string'
              //   console.log(URLid);
              //   console.log(URLname)
             
             
               $.ajax("/api/game", {
                     type: "PUT",
                     data: {id: players[i].URLid, name: players[i].URLname, score: players[i].score},
            
                   }).then(
                     function() {
                       //window.location.replace("/score");
                     }
                   );
        // if (players[i].score < 0) {
        //   window.location.replace("/score");
        // }                
        
          
            // console.log("Player:" +(players[i].playerCount+1)+ "Score:" +   players[i].score);
    
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

    // 

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      var txt;
     
      var score;
      ctx.font = "50px Arial";
      //  console.log(ctx);
      if(this.score<0){
      score = 0;
      }else{
      score = Math.floor(this.score);
      }
       txt = "Player: " +(this.playerCount+1) + "\nScore: " + score;
 
      var x =100;
      var y =80;
      var lineheight = 55;
      var lines = txt.split("\n");

      if (this.playerCount % 2 === 0) {
        // var crashVal = 0;
     
      } else {
         x= 1500;
         y=80;
        //  y=y+250;
        
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
