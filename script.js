// Atualizar ano automático
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// NOVA ANIMAÇÃO DE BOLINHAS (versão Jhon — moderna e suave)
// =========================================================

const canvas = document.getElementById("bg-animation");

if (canvas)
{
    const ctx = canvas.getContext("2d");

    function resizeCanvas()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let particles = [];

    function random(min, max)
    {
        return Math.random() * (max - min) + min;
    }

    function createParticles(qtd)
    {
        particles = [];

        for (let i = 0; i < qtd; i++)
        {
            particles.push({
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                radius: random(1, 2.5),
                speedX: random(-0.4, 0.4),
                speedY: random(-0.4, 0.4),
                alpha: random(0.15, 0.5)
            });
        }
    }

    createParticles(50);

    function animateParticles()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) =>
        {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(120, 180, 255, ${p.alpha})`;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// =========================================================
// RESTANTE DO SEU CÓDIGO (MANTIDO 100% IGUAL!)
// =========================================================

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

document.querySelector("#contato form").addEventListener("submit", function (e) {
  e.preventDefault(); // evita reload da página

  const nome = this.querySelector("input[name='nome']").value;
  const email = this.querySelector("input[name='email']").value;
  const mensagem = this.querySelector("textarea[name='mensagem']").value;

  const numero = "5561994503282";

  const texto = `Olá, meu nome é ${nome}.
  Email: ${email}
  Mensagem: ${mensagem}`;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");

  this.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});





document.querySelectorAll(".saiba-mais").forEach(btn => {
  btn.addEventListener("click", () => {
    const detalhes = btn.nextElementSibling;
    detalhes.style.display =
      detalhes.style.display === "block" ? "none" : "block";
  });
});


// =========================================================
// SEÇÃO SERVIÇO
// =========================================================

document.querySelectorAll('.saiba-mais').forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.servico-card, .servico-card1, .servico-card2, .servico-card3');
    if (card) {
      card.classList.toggle('ativo');
    }
  });
});
