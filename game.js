function startGame() {
  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 80) {
      // "P" key
      togglePause();
    } else if (event.keyCode === 82) {
      // "R" key
      location.reload();
    } else if (event.keyCode == 32) {
      player.shoot();
    }
  });
  startScreen.hide();
  gamearea.start();
  setTimeout(startAlienShooting, 3000);
}

function updateScore() {
  gamearea.context.clearRect(window.innerWidth - 200, 0, 200, 50);
  gamearea.context.fillStyle = "Chartreuse";
  gamearea.context.font = "bold 30px Consolas";
  gamearea.context.fillText("Score:" + score, window.innerWidth - 200, 50);
}

var keysPressed = {};

window.addEventListener("keydown", function (event) {
  keysPressed[event.keyCode] = true;

  // Check if "Space" key is pressed
  if (keysPressed[32]) {
    if (this.document.getElementById("startScreen").style.display != "none") {
      startGame();
    } else {
      player.shoot();
    }
  }
});

window.addEventListener("keyup", function (event) {
  delete keysPressed[event.keyCode];
});
