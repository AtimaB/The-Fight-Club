export default (player, socket) => {
   
    document.onkeydown = e => {
        let dir;
        if(e.keyCode === 39) dir = "right";
        if(e.keyCode === 40) dir = "down";
        if(e.keyCode === 37) dir = "left";
        if(e.keyCode === 38) dir = "up";
        if(!dir) {
            return;
        }
        player.move(dir);
        }

    document.onkeyup = e => {
        let dir;
        if(e.keyCode === 39) dir = "right";
        if(e.keyCode === 40) dir = "down";
        if(e.keyCode === 37) dir = "left";
        if(e.keyCode === 38) dir = "up";
        if(!dir) {
            return;
        }
        player.stop(dir);
        socket.emit("update-player", player);
        }
}