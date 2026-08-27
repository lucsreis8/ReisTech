/* ==========================================================================
   REISTECH — testimonials.js
   Very slow, low-opacity "connected diagnostics grid" behind the feedback
   section. Purely ambient — never competes with the text in front of it.
   ========================================================================== */
(function () {
  const canvas = document.getElementById('feedbacks-bg');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let points = [];
  let mouse = { x: null, y: null };
  let raf;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(18, Math.min(46, Math.floor((w * h) / 42000)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });

    const maxDist = Math.min(w, h) * 0.22;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.16;
          ctx.strokeStyle = `rgba(124,77,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    points.forEach(p => {
      ctx.fillStyle = 'rgba(201,162,77,0.45)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    raf = requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!raf && !reduceMotion) raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }, { threshold: 0.05 });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  io.observe(canvas);

  if (reduceMotion) {
    // draw a single static frame so the canvas isn't blank, then stop
    step = (function (orig) {
      return function () { orig(); cancelAnimationFrame(raf); raf = null; };
    })(step);
  }
})();
