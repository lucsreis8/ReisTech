/* ==========================================================================
   REISTECH — orcamento.js
   Pre-fills "tipo de serviço" from a ?servico= query param (so every
   "Solicitar orçamento" button on the site can deep-link into the right
   option), validates the form, and submits it to Web3Forms
   (https://web3forms.com) — no backend of your own required.

   Setup: create a free account at web3forms.com, grab your Access Key,
   and paste it into the hidden "access_key" input in orcamento.html.
   ========================================================================== */
(function () {
  const form = document.querySelector('.quote-form');
  if (!form) return;

  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  // --- deep link prefill (?servico=web, celular, console, upgrade, pc, notebook, outro) ---
  const params = new URLSearchParams(window.location.search);
  const servico = params.get('servico');
  if (servico) {
    const radio = form.querySelector(`input[name="servico"][value="${CSS.escape(servico)}"]`);
    if (radio) radio.checked = true;
  }

  // --- submit handling ---
  const status = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const accessKeyInput = form.querySelector('input[name="access_key"]');

  function showStatus(message, kind) {
    status.textContent = message;
    status.classList.remove('success', 'error');
    status.classList.add(kind, 'is-visible');
    status.setAttribute('tabindex', '-1');
    status.focus();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!accessKeyInput || !accessKeyInput.value || accessKeyInput.value.startsWith('COLOQUE-')) {
      showStatus('Formulário ainda não configurado: falta o Access Key do Web3Forms.', 'error');
      return;
    }

    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    status.classList.remove('is-visible', 'success', 'error');

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        showStatus('Solicitação enviada! A ReisTech vai entrar em contato em breve.', 'success');
        form.reset();
      } else {
        throw new Error(result.message || 'Falha ao enviar');
      }
    } catch (err) {
      showStatus('Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
})();
