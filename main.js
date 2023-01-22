const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const dinoImg = new Image();
dinoImg.src = "dino.png";

const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dinoImg, this.x, this.y);
  },
};
dino.draw();

const cactusImg = new Image();
cactusImg.src = "cactus.png";

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactusImg, this.x, this.y);
  }
}

let timer = 0;
const cactusArr = [];
let animation;

let isJump = false;
let jumpTimer = 0;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    isJump = true;
  }
});

function playFrame() {
  animation = requestAnimationFrame(playFrame);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 프레임마다 캔버스 모두 지우기

  if (timer % 120 === 0) {
    const cactus = new Cactus();
    cactusArr.push(cactus);
  }

  cactusArr.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }

    a.x--;

    checkCrash(dino, a);

    a.draw();
  });

  if (isJump) {
    dino.y--;
    jumpTimer++;
  }

  if (!isJump) {
    if (dino.y < 200) {
      dino.y++;
    }
  }

  if (jumpTimer > 100) {
    isJump = false;
  }

  dino.draw();
}

playFrame();

function checkCrash(dino, cactus) {
  const xDiff = cactus.x - (dino.x + dino.width);
  const yDiff = cactus.y - (dino.y + dino.height);

  if (xDiff < 0 && yDiff < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}
