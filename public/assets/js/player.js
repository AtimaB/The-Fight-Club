class Player{

constructor({id, x=10, y=10, w=50, h=50, color="black"}){
this.id=id;
this.x=x;
this.y =y;
this.w=w;
this.h=h;
this.color=color;
this.speed = 2;
this.isMoving = {};

}
draw(ctx){
    if(this.isMoving.right)this.x += this.speed;
    if(this.isMoving.left)this.x -= this.speed;
    if(this.isMoving.up)this.y -= this.speed;
    if(this.isMoving.down)this.y += this.speed;
    this.y = Math.min(this.y, 600 - this.h)
    this.x = Math.min(this.x, 800 - this.w)
    if(this.x < 0) {
        this.x = 0;
    }
    if(this.y < 0) {
        this.y = 0;
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

move(dir){
   this.isMoving[dir] = true;
}

stop(dir){
    this.isMoving[dir] = false;
}

}

export default Player;  