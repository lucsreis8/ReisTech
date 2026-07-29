document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.getElementById("bg-animation");

if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticles(qtd) {
    particles = [];
    for (let i = 0; i < qtd; i++) {
      particles.push({
        x: random(0, width),
        y: random(0, height),
        radius: random(1, 2.2),
        speedX: random(-0.25, 0.25),
        speedY: random(-0.25, 0.25),
        isNode: Math.random() > 0.7
      });
    }
  }

  const density = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000));
  createParticles(density);

  const linkDistance = 130;

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < linkDistance) {
          const alpha = (1 - dist / linkDistance) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isNode ? "rgba(217, 164, 65, 0.55)" : "rgba(120, 170, 255, 0.4)";
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;
      if (p.y > height) p.y = 0;
      if (p.y < 0) p.y = height;
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

document.querySelectorAll(".saiba-mais").forEach((botao) => {
  botao.addEventListener("click", () => {
    const card = botao.closest(".servico-card, .servico-card1, .servico-card2, .servico-card3");
    if (!card) return;

    card.classList.toggle("ativo");
    botao.textContent = card.classList.contains("ativo") ? "Fechar" : "Saiba Mais";
  });
});

document.querySelector("#contato form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = this.querySelector("input[name='nome']").value;
  const email = this.querySelector("input[name='email']").value;
  const mensagem = this.querySelector("textarea[name='mensagem']").value;
  const numero = "5561995171058";

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

  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent ? Array.from(parent.children).filter((c) => c.classList.contains("reveal")) : [];
          const index = siblings.indexOf(entry.target);
          const delay = index >= 0 ? index * 90 : 0;

          setTimeout(() => entry.target.classList.add("is-visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
});



