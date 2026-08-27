/* ==========================================================================
   REISTECH — main.js
   Site-wide bootstrap: footer year, anchor offset for the floating header
   ========================================================================== */
(function () {
  // footer year
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Compensate anchor scrolling for the floating/fixed header height
  const header = document.querySelector('.site-header');
  const offset = () => (header ? header.offsetHeight + 34 : 0);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - offset();
      window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
      history.pushState(null, '', id);
    });
  });

  // Stagger reveal delays for elements grouped in a grid
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.setAttribute('data-reveal-delay', String(i * 90));
    });
  });
})();
