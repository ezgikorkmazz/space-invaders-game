function movePlayer(event) {
  if (!player.moving) {
    moveInterval = setInterval(function () {
      player.move(event);
    }, 25); //every 25 ms
    player.moving = true;
  }
}

function stopPlayer(event) {
  clearInterval(moveInterval);
  player.moving = false;
}

var player = {
  x: 40,
  y: window.innerWidth * 0.66 - 200,
  moving: false,
  width: 80,
  height: 60,
  image: new Image(),
  draw: function () {
    this.image.src = "images/ship.svg";
    this.image.onload = () =>
      gamearea.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
  },
  update: function (d) {
    this.x += d;
  },
  move: function (ev) {
    gamearea.context.clearRect(this.x, this.y, this.width, this.height);
    if (ev.keyCode == 37 && this.x > 0) {
      this.update(-15);
    } else if (ev.keyCode == 39 && this.x + 80 < window.innerWidth) {
      this.update(15);
    }
    this.draw();
  },
  shoot: function () {
    var b = new bullet(this.x + 40, this.y);
    if (b.x == null) {
      return;
    }
    shootSound.currentTime = 0;
    shootSound.play();

    b.inerval = setInterval(function () {
      b.update();
    }, 10);
  },
};

function updatePlayer() {
  player.draw();
}

function bullet(x, y) {
  if (Date.now() - lastFired < 500) {
    return;
  }
  lastFired = Date.now();
  this.x = x;
  this.y = y;
  this.inerval = 0;
  this.update = function () {
    gamearea.context.clearRect(this.x, this.y, 5, 10);
    for (i = 0; i < aliens.length; i++) {
      if (
        this.x > aliens[i].x &&
        this.x < aliens[i].x + 45 &&
        this.y > aliens[i].y &&
        this.y < aliens[i].y + 30 &&
        aliens[i].type != "x"
      ) {
        alienKilledSound.play();
        score += aliens[i].score;
        updateScore();
        noShotaliens++;
        clearInterval(this.inerval);
        aliens[i].type = "x";
        if (noShotaliens == aliens.length) gamearea.stop(true);
        return;
      }
    }
    this.y -= 10;
    gamearea.context.fillRect(this.x, this.y, 5, 10);

    if (this.y < -50) {
      clearInterval(this.inerval);
    }
  };
}
