/* ==========================================================================
   REISTECH — animations.js
   Scroll reveals, hero entrance, subtle mouse parallax, accordions
   ========================================================================== */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(el => io.observe(el));
    }
  }

  /* ---------- hero entrance sequence ---------- */
  document.querySelectorAll('.hero-copy > *, .hero-visual').forEach((el, i) => {
    el.style.animationDelay = (i * 90) + 'ms';
  });

  /* ---------- subtle mouse parallax on hero visual (desktop only) ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    const glow = heroVisual.querySelector('.hero-visual-glow');
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.transform = `rotate(${px * 1.4}deg)`;
      if (glow) glow.style.transform = `translate(${px * 18}px, ${py * 18}px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transform = '';
      if (glow) glow.style.transform = '';
    });
  }

  /* ---------- services accordion ---------- */
  const servicePanels = document.querySelectorAll('.service-panel');
  servicePanels.forEach((panel) => {
    const head = panel.querySelector('.service-panel-head');
    head.addEventListener('click', () => {
      const wasOpen = panel.classList.contains('is-open');
      servicePanels.forEach(p => {
        p.classList.remove('is-open');
        p.querySelector('.service-panel-head').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        panel.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
        if (!reduceMotion) {
          setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 200);
        }
      }
    });
  });

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      faqItems.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
