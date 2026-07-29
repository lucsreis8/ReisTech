// ======================================================
// FORMULÁRIO + WHATSAPP
// ======================================================

const form = document.getElementById("formOrcamento");
const mensagemSucesso = document.getElementById("msgSucesso");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nome = this.nome.value.trim();
        const email = this.email.value.trim();
        const telefone = this.telefone.value.trim() || "Não informado";
        const servico = this.servico.value;
        const mensagem = this.mensagem.value.trim();

        localStorage.setItem("orcamento_nome", nome);
        localStorage.setItem("orcamento_email", email);
        localStorage.setItem("orcamento_telefone", telefone);
        localStorage.setItem("orcamento_servico", servico);

        const numero = "5561995171058";

        const texto =
`*NOVO PEDIDO DE ORÇAMENTO*

*Nome:* ${nome}

*Email:* ${email}

*Telefone:* ${telefone}

*Serviço:* ${servico}

*Descrição:*

${mensagem}`;

        const url =
            `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");

        mensagemSucesso.classList.add("show");
        mensagemSucesso.innerHTML =
            "Seu orçamento foi enviado para o WhatsApp.";

        setTimeout(() => {

            mensagemSucesso.classList.remove("show");

        }, 5000);

        this.reset();

    });

}


// ======================================================
// LOCAL STORAGE
// ======================================================

window.addEventListener("DOMContentLoaded", () => {

    const nome = localStorage.getItem("orcamento_nome");
    const email = localStorage.getItem("orcamento_email");
    const telefone = localStorage.getItem("orcamento_telefone");
    const servico = localStorage.getItem("orcamento_servico");

    if (nome)
        document.querySelector("[name=nome]").value = nome;

    if (email)
        document.querySelector("[name=email]").value = email;

    if (telefone && telefone !== "Não informado")
        document.querySelector("[name=telefone]").value = telefone;

    if (servico)
        document.querySelector("[name=servico]").value = servico;

});


// ======================================================
// REVEAL ANIMATION
// ======================================================

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: .15
});

reveals.forEach(item => revealObserver.observe(item));


// ======================================================
// PARALLAX DOS BLURS
// ======================================================

const blurs = document.querySelectorAll(".blur");

window.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - .5) * 25;
    const y = (e.clientY / window.innerHeight - .5) * 25;

    blurs.forEach((blur, index) => {

        const intensidade = (index + 1) * .7;

        blur.style.transform =
            `translate(${x * intensidade}px, ${y * intensidade}px)`;

    });

});


// ======================================================
// HOVER DOS INPUTS
// ======================================================

document
    .querySelectorAll("input, textarea, select")
    .forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("focus");

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove("focus");

        });

    });


// ======================================================
// CANVAS MODERNO
// ======================================================

const canvas = document.getElementById("bg-animation");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resize() {

        canvas.width = innerWidth;
        canvas.height = innerHeight;

    }

    resize();

    addEventListener("resize", resize);

    const particles = [];

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

    for (let i = 0; i < 80; i++) {

        particles.push({

            x: random(0, canvas.width),

            y: random(0, canvas.height),

            radius: random(1.5, 3),

            speedX: random(-0.35, 0.35),

            speedY: random(-0.35, 0.35),

            alpha: random(.15, .6)

        });

    }

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width)
                p.speedX *= -1;

            if (p.y < 0 || p.y > canvas.height)
                p.speedY *= -1;

            ctx.beginPath();

            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

            ctx.fillStyle =
                `rgba(217,164,65,${p.alpha})`;

            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {

                const p2 = particles[j];

                const dx = p.x - p2.x;
                const dy = p.y - p2.y;

                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {

                    ctx.beginPath();

                    ctx.moveTo(p.x, p.y);

                    ctx.lineTo(p2.x, p2.y);

                    ctx.strokeStyle =
                        `rgba(124,58,237,${0.18 - dist / 900})`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        });

        requestAnimationFrame(draw);

    }

    draw();

}