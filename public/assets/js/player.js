class Player{

    constructor({id, w=30, h=30, img , x=10, y=20, type}){
        this.type = type;
        //  if (type == "image") {
        //    this.image = new Image();
        //    this.image.src = color;
        //  }
        this.img = img;
    this.id=id;
    this.w=w;
    this.h=h;
    this.x=x;
    this.y=y;
    // this.img = img;
    // this.color=color;
    this.speed = 2;
    this.isMoving = {};
    
    }
    draw(ctx){
        if(this.isMoving.right)this.x += this.speed;
        if(this.isMoving.left)this.x -= this.speed;
        if(this.isMoving.up)this.y -= this.speed;
        if(this.isMoving.down)this.y += this.speed;
         this.y = Math.min(this.y, 600 -this.h)
         this.x = Math.min(this.x, 800 -this.w)
         if(this.x < 0) {
             this.x = 0;
         }
         if(this.y < 0) {
             this.y = 0;
         }
        ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        // ctx.drawImage(image, this.x,this.y);
        if (this.type == "image") {
            // ctx.drawImage(this.image,
            //   this.x,
            //   this.y,
            //   this.width, this.height);
            var img = document.getElementById('source');
    
            ctx.drawImage(img,this.x,this.y,this.width,this.height);
          } else {
            // ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
          }
    }
    
    move(dir){
       this.isMoving[dir] = true;
    }
    
    stop(dir){
        this.isMoving[dir] = false;
    }
    
    }
    
    export default Player;  