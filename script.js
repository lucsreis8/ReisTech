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

// Expansão do "Saiba Mais"
document.querySelectorAll(".saiba-mais").forEach(botao => {
  botao.addEventListener("click", () => {
    const card = botao.parentElement;
    card.classList.toggle("active");

    if (card.classList.contains("active")) {
      botao.textContent = "Fechar";
    } else {
      botao.textContent = "Saiba Mais";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contato form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pega os valores do formulário
    const nome = form.querySelector("input[name='nome']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const mensagem = form.querySelector("textarea[name='mensagem']").value.trim();

    // Número do WhatsApp (coloque o seu com DDD, sem espaços)
    const telefone = "5561994503282"; // exemplo: 55 + DDD + número

    // Monta o texto que vai pro zap
    const texto = `Olá, meu nome é ${nome}.
Email: ${email}
Mensagem: ${mensagem}`;

    // Gera a URL do WhatsApp
    const url = `https://wa.me/556194503282`;

    // Abre no WhatsApp
    window.open(url, "_blank");
  });
});

