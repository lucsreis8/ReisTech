// ======================================================
// MENU MOBILE
// ======================================================

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});

// ======================================================
// REVEAL ON SCROLL
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

reveals.forEach(el => revealObserver.observe(el));

// ======================================================
// CONTADORES
// ======================================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;

        const speed = target / 70;

        function update() {

            current += speed;

            if (current < target) {

                counter.innerText = Math.floor(current);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        }

        update();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: .5
});

counters.forEach(counter => counterObserver.observe(counter));

// ======================================================
// EFEITO TILT NOS CARDS
// ======================================================

const cards = document.querySelectorAll(".king-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - .5) * 16;
        const rotateX = ((y / rect.height) - .5) * -16;

        card.style.transform =
            `perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});

// ======================================================
// PARALLAX DA IMAGEM
// ======================================================

const kingImage = document.querySelector(".king-image");

window.addEventListener("mousemove", e => {

    if (!kingImage) return;

    const x = (e.clientX / window.innerWidth - .5) * 20;
    const y = (e.clientY / window.innerHeight - .5) * 20;

    kingImage.style.transform =
        `translate(${x}px, ${y}px)`;

});

// ======================================================
// GLOW ACOMPANHANDO O MOUSE
// ======================================================

const glow = document.querySelector(".king-circle");

window.addEventListener("mousemove", e => {

    if (!glow) return;

    const x = e.clientX * 0.03;
    const y = e.clientY * 0.03;

    glow.style.transform =
        `translate(${x}px, ${y}px)`;

});

// ======================================================
// PARTÍCULAS DE FUNDO
// ======================================================

const canvas = document.getElementById("bg-animation");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    const particles = [];

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

    for (let i = 0; i < 65; i++) {

        particles.push({

            x: random(0, canvas.width),
            y: random(0, canvas.height),

            radius: random(1, 3),

            speedX: random(-0.25, .25),
            speedY: random(-0.25, .25),

            alpha: random(.15, .45)

        });

    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(130,170,255,${p.alpha})`;

            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;

            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;

        });

        requestAnimationFrame(animate);

    }

    animate();

}