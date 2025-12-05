document.getElementById("formOrcamento").addEventListener("submit", function(e) {
  e.preventDefault();

  // Pega os valores do formulário
  const nome = this.nome.value;
  const email = this.email.value;
  const telefone = this.telefone.value || "Não informado";
  const servico = this.servico.value;
  const mensagem = this.mensagem.value;

  // Salva no localStorage para reutilizar depois
  localStorage.setItem("orcamento_nome", nome);
  localStorage.setItem("orcamento_email", email);
  localStorage.setItem("orcamento_telefone", telefone);
  localStorage.setItem("orcamento_servico", servico);

  // Número do WhatsApp (troque pelo seu)
  const numero = "5561995171058"; // Ex: 5511912345678

  // Monta a mensagem formatada
  const texto = `
*NOVO ORÇAMENTO:*

*Nome:* ${nome}
*Email:* ${email}
*Telefone:* ${telefone}
*Serviço:* ${servico}
*Mensagem:* ${mensagem}
  `;

  // Gera o link do WhatsApp
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  // Abre o WhatsApp em nova aba
  window.open(url, "_blank");

  // Mostra mensagem de confirmação
  const msg = document.getElementById("msgSucesso");
  msg.style.display = "block";
  msg.textContent = "✅ Seu orçamento foi enviado para o WhatsApp!";

  // Some a mensagem depois de alguns segundos
  setTimeout(() => {
    msg.style.display = "none";
  }, 5000);

  // Reseta o formulário
  this.reset();
});

// Quando carregar a página, já preencher os dados salvos
window.addEventListener("DOMContentLoaded", () => {
  const nomeSalvo = localStorage.getItem("orcamento_nome");
  const emailSalvo = localStorage.getItem("orcamento_email");
  const telefoneSalvo = localStorage.getItem("orcamento_telefone");
  const servicoSalvo = localStorage.getItem("orcamento_servico");

  if (nomeSalvo) document.querySelector("[name=nome]").value = nomeSalvo;
  if (emailSalvo) document.querySelector("[name=email]").value = emailSalvo;
  if (telefoneSalvo && telefoneSalvo !== "Não informado") {
    document.querySelector("[name=telefone]").value = telefoneSalvo;
  }
  if (servicoSalvo) document.querySelector("[name=servico]").value = servicoSalvo;
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