document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".king-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});


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




const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
