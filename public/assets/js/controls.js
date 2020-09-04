export default (player, socket) => {
  document.onkeydown = (e) => {
    let dir;
    if (e.keyCode === 39) dir = "right";
    if (e.keyCode === 40) dir = "down";
    if (e.keyCode === 37) dir = "left";
    if (e.keyCode === 38) dir = "up";
    if (e.keyCode === 16) dir = "shift";
    if (!dir) {
      return;
    }
    player.move(dir);
    socket.emit("update-player", player);
  };

  document.onkeyup = (e) => {
    let dir;
    if (e.keyCode === 39) dir = "right";
    if (e.keyCode === 40) dir = "down";
    if (e.keyCode === 37) dir = "left";
    if (e.keyCode === 38) dir = "up";
    if (e.keyCode === 16) dir = "shift";
    if (!dir) {
      return;
    }
    // player.images.src = "../public/assets/images/char1.png";
    player.stop(dir);
    socket.emit("update-player", player);
  };
};
