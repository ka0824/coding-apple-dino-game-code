const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
dino.draw();

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
const cactusArr = [];

function playFrame() {
  requestAnimationFrame(playFrame);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 프레임마다 캔버스 모두 지우기

  if (timer % 120 === 0) {
    const cactus = new Cactus();
    cactusArr.push(cactus);
  }

  cactusArr.forEach((a) => {
    a.x--;
    a.draw();
  });

  dino.draw();
}

playFrame();
