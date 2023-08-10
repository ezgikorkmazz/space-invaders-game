var gamearea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerWidth * 0.66;
    this.canvas.style.background = "url('images/space.png')";
    this.canvas.style.border = "3px solid gray";
    this.canvas.style.display = "block";
    this.canvas.style.margin = "auto";
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context = this.canvas.getContext("2d");
    player.draw();
    nums = ["3", "3", "2", "2", "1"];
    shiftShape = 0;
    (dx = -30), (dy = 0), (forward = true);

    updateScore();
    aliens = new Array(50);
    mainLoop = setInterval(updatePlayer, 1, event);
    alienLoop = setInterval(updateAliens, aliensSpeed, event);
    window.addEventListener("keydown", movePlayer, event);
    window.addEventListener("keyup", stopPlayer, event);
  },
  stop: function (winning) {
    clearInterval(mainLoop);
    clearInterval(alienLoop);
    clearInterval(alienShootLoop);
    window.removeEventListener("keydown", movePlayer);
    window.removeEventListener("keyup", stopPlayer);
    gamearea.context.fillStyle = "black";
    gamearea.context.globalAlpha = 0.5;
    gamearea.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    var menuDiv = document.createElement("div");
    menuDiv.id = "menuScreen";
    menuDiv.style.position = "absolute";
    menuDiv.style.top = "50%";
    menuDiv.style.left = "50%";
    menuDiv.style.transform = "translate(-50%, -50%)";
    menuDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    menuDiv.style.color = "white";
    menuDiv.style.padding = "20px";
    menuDiv.style.borderRadius = "10px";
    menuDiv.style.textAlign = "center";

    if (winning) {
      menuDiv.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You Win!</p>
      `;
    } else {
      menuDiv.innerHTML = `
        <h2>Game Over</h2>
        <p>You Lose</p>
      `;
    }

    var restartButton = document.createElement("button");
    restartButton.style.padding = "10px 20px";
    restartButton.style.fontSize = "16px";
    restartButton.style.backgroundColor = "#4CAF50";
    restartButton.style.color = "white";
    restartButton.style.border = "none";
    restartButton.style.borderRadius = "5px";
    restartButton.style.cursor = "pointer";
    restartButton.style.transition = "background-color 0.3s";
    restartButton.innerText = "Restart";
    restartButton.onclick = function () {
      location.reload();
    };
    menuDiv.appendChild(restartButton);

    document.body.appendChild(menuDiv);
  },
};

function showPauseCard() {
  let pauseDiv = document.createElement("div");
  pauseDiv.id = "pauseScreen";
  pauseDiv.style.position = "absolute";
  pauseDiv.style.top = "50%";
  pauseDiv.style.left = "50%";
  pauseDiv.style.transform = "translate(-50%, -50%)";
  pauseDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  pauseDiv.style.color = "white";
  pauseDiv.style.padding = "20px";
  pauseDiv.style.borderRadius = "10px";
  pauseDiv.style.textAlign = "center";

  pauseDiv.innerHTML = `
    <h2>Game Paused</h2>
    <p>Continue or exit the game</p>
    <button style="margin-right: 10px; padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;" onclick="togglePause()">Continue</button>
    <button style="padding: 10px 20px; font-size: 16px; background-color: #FF5733; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;" onclick="location.reload()">Exit</button>
  `;

  document.body.appendChild(pauseDiv);
}

var startScreen = {
  show: function () {
    var startScreenDiv = document.getElementById("startScreen");
    startScreenDiv.style.display = "block";
  },
  hide: function () {
    var startScreenDiv = document.getElementById("startScreen");
    startScreenDiv.style.display = "none";
  },
};

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(mainLoop);
    clearInterval(alienLoop);
    clearInterval(alienShootLoop);
    showPauseCard();
  } else {
    document.getElementById("pauseScreen").remove();
    mainLoop = setInterval(updatePlayer, 1);
    alienLoop = setInterval(updateAliens, aliensSpeed);
    alienShootLoop = setInterval(startAlienShooting, 2000);
  }
}
