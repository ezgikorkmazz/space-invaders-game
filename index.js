const shootSound = document.getElementById("shootSound");
const alienShootSound = document.getElementById("alienShootSound");
console.log(shootSound);

player.shoot = function () {
  var b = new bullet(this.x + 40, this.y);
  b.inerval = setInterval(function () {
    b.update();
  }, 10);

  shootSound.currentTime = 0;
  shootSound.play();
};

this.shoot = function () {
  if (this.canShoot) {
    activeBullet = new alienMissile(this.x, this.y + 30);
    activeBullet.interval = setInterval(function () {
      activeBullet.update();
    }, 10);

    alienShootSound.currentTime = 0;
    alienShootSound.play();
  }
};
