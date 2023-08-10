function alien(type) {
  this.type = type;
  this.score = 0;
  this.canShoot = type === "3";
  this.draw = function (x, y, shape) {
    this.x = x;
    this.y = y;
    var alienImage = new Image();
    switch (this.type) {
      case "0": //'0' is an alien that has been shot
        this.score = 0;
        this.type = x;
        break;
      case "1":
        shape == 0
          ? (alienImage.src = "images/alien1.png")
          : (alienImage.src = "images/alien1p.png");

        this.score = 10; //bu skorları her saucer a özel yapabilirsin
        break;

      case "2":
        shape == 0
          ? (alienImage.src = "images/alien2.png")
          : (alienImage.src = "images/alien2p.png");

        this.score = 10;
        break;

      case "3":
        shape == 0
          ? (alienImage.src = "images/alien3.png")
          : (alienImage.src = "images/alien3p.png");

        this.score = 10;
        break;
      default:
        gamearea.context.clearRect(this.x, this.y, 45, 30);
        return;
    }
    alienImage.onload = function () {
      gamearea.context.drawImage(alienImage, x, y, 45, 30);
    };
  };
  this.shoot = function () {
    if (this.canShoot) {
      activeBullet = new alienMissile(this.x, this.y + 30);
      activeBullet.interval = setInterval(function () {
        activeBullet.update();
      }, 10);
    }
  };
}

function updateAliens() {
  displayAlien();
}

function displayAlien(moveCooldown) {
  stepCounter++;
  if (stepCounter % 10 == 0) {
    if (aliensSpeed > 250) {
      aliensSpeed -= 25;
    }
    clearInterval(alienLoop);
    alienLoop = setInterval(updateAliens, aliensSpeed, event);
  }
  if (shiftShape == 0) {
    for (i = 0; i < aliens.length; i++) {
      aliens[i] = new alien(nums[i % 5]);
    }
  }
  gamearea.context.clearRect(
    0,
    100,
    window.innerWidth,
    window.innerWidth * 0.66 - 200
  );
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 5; j++) {
      aliens[i * 5 + j].draw(
        65 * i + 30 + dx,
        260 - j * 40 + dy,
        shiftShape % 2
      );
      if (
        aliens[i * 5 + j].y >= window.innerWidth * 0.66 - 230 &&
        aliens[i * 5 + j].type != "0" &&
        aliens[i * 5 + j].type != "x"
      ) {
        gamearea.stop(false);
      }
    }
  }
  if (forward) {
    if (dx > window.innerWidth - 10 * 45 - 9 * 30 + 38) {
      forward = false;
      dy += verticalStepSize;
      return;
    }
    dx += horizantalStepSize;
  } else {
    if (dx < 0) {
      forward = true;
      dy += verticalStepSize;
      return;
    }
    dx -= horizantalStepSize;
  }
  shiftShape++;
}
function alien(type) {
  this.type = type;
  this.score = 0;
  this.canShoot = type === "3";
  this.draw = function (x, y, shape) {
    this.x = x;
    this.y = y;
    var alienImage = new Image();
    switch (this.type) {
      case "0":
        this.score = 0;
        this.type = x;
        break;
      case "1":
        shape == 0
          ? (alienImage.src = "images/alien1.png")
          : (alienImage.src = "images/alien1p.png");

        this.score = 10; //bu skorları her saucer a özel yapabilirsin
        break;

      case "2":
        shape == 0
          ? (alienImage.src = "images/alien2.png")
          : (alienImage.src = "images/alien2p.png");

        this.score = 10;
        break;

      case "3":
        shape == 0
          ? (alienImage.src = "images/alien3.png")
          : (alienImage.src = "images/alien3p.png");

        this.score = 10;
        break;
      default:
        gamearea.context.clearRect(this.x, this.y, 45, 30);
        return;
    }
    alienImage.onload = function () {
      gamearea.context.drawImage(alienImage, x, y, 45, 30);
    };
  };
  this.shoot = function () {
    if (this.canShoot) {
      activeBullet = new alienMissile(this.x, this.y + 30);
      activeBullet.interval = setInterval(function () {
        activeBullet.update();
      }, 10);
    }
  };
}

function startAlienShooting() {
  alienShootLoop = setInterval(function () {
    const eligibleAliens = aliens.filter((alien) => alien.canShoot);
    if (eligibleAliens.length > 0) {
      const randomAlien =
        eligibleAliens[Math.floor(Math.random() * eligibleAliens.length)];
      randomAlien.shoot();
    }
  }, 2000);
}

function alienMissile(x, y) {
  this.x = x + 20; // Position the missile at the center of the alien
  this.y = y;
  this.interval = 0;
  this.update = function () {
    gamearea.context.clearRect(this.x - 2, this.y, 10, 15);

    if (
      this.x > player.x &&
      this.x < player.x + player.width &&
      this.y > player.y &&
      this.y < player.y + player.height
    ) {
      gamearea.stop(false); // Game over if missile hits the player
      clearInterval(this.interval);
      return;
    }

    this.y += 5; // Move the missile downward
    gamearea.context.fillStyle = "red";
    gamearea.context.fillRect(this.x, this.y, 6, 12);

    // Check if the missile is out of the game area
    if (this.y > window.innerHeight) {
      clearInterval(this.interval);
    }
  };
}
