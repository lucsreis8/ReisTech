// Atualizar ano automático
document.getElementById("year").textContent = new Date().getFullYear();

// Animação de bolinhas
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createBall() {
  return {
    x: random(0, canvas.width),
    y: random(-100, -10),
    radius: random(2, 6),
    color: Math.random() > 0.5 ? "#6a0dad" : "#00ffff",
    speed: random(0.2, 1)
  };
}

for (let i = 0; i < 100; i++) {
  balls.push(createBall());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();

    b.y += b.speed;
    if (b.y > canvas.height) {
      b.x = random(0, canvas.width);
      b.y = random(-100, -10);
    }
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});