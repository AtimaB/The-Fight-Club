class Player{

constructor({id, w=450, h=500, img , x, y, type, playerCount}){
    this.type = type;
    //  if (type == "image") {
    //    this.image = new Image();
    //    this.image.src = color;
    //  }
    this.img = img;
    this.playerCount=playerCount;
    this.id=id;
    this.w=w;
    this.h=h;
    this.x=x;
    this.y=y;
    // this.img = img;
    // this.color=color;
    this.speed = 2;
    this.isMoving = {};
    // this.draw = draw;

}
draw(ctx){

      var movingImg ;
          if(this.playerCount%2 === 0){
             
            this.img = document.getElementById('source');
          
          } else{
              
            this.img = document.getElementById('source1');
          
          }

          if(this.isMoving.right){
            this.x += this.speed;
            if(this.playerCount%2 === 0){
            this.img = document.getElementById('moving');
            }else{
              this.img = document.getElementById('moving1');
            }
           
          }
          if(this.isMoving.left){
            this.x -= this.speed;
            if(this.playerCount%2 === 0){
            this.img = document.getElementById('moving');
           
          }else{
            this.img = document.getElementById('moving1');
          }
        }
        
        //  if(this.isMoving.up)this.y -= this.speed;
        //  if(this.isMoving.down)this.y += this.speed;
         
          this.x = Math.min(this.x, 1700 -this.w)
          this.y = Math.min(this.y, 1000 -this.h)

          if(this.x < 0) {
              this.x = 0;
          }
          if(this.y < 0) {
              this.y = 0;
          }

        // ctx.beginPath();
   
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    
}

move(dir){
   this.isMoving[dir] = true;
}

stop(dir){
    this.isMoving[dir] = false;
}

}

export default Player;  