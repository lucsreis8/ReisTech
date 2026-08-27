/* ==========================================================================
   REISTECH — orcamento.js
   Pre-fills "tipo de serviço" from a ?servico= query param (so every
   "Solicitar orçamento" button on the site can deep-link into the right
   option), plus lightweight validation and a submit confirmation state.
   No backend is wired up yet — replace the fetch() call with your endpoint.
   ========================================================================== */
(function () {
  const form = document.querySelector('.quote-form');
  if (!form) return;

  // --- deep link prefill ---
  const params = new URLSearchParams(window.location.search);
  const servico = params.get('servico');
  if (servico) {
    const radio = form.querySelector(`input[name="servico"][value="${CSS.escape(servico)}"]`);
    if (radio) radio.checked = true;
  }

  // --- submit handling ---
  const status = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Placeholder submit — swap for a real endpoint (e.g. fetch('/api/orcamento', {...}))
    await new Promise(res => setTimeout(res, 900));

    status.textContent = 'Solicitação enviada! A ReisTech vai entrar em contato em breve.';
    status.classList.add('success', 'is-visible');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = original;
    status.setAttribute('tabindex', '-1');
    status.focus();
  });
})();
