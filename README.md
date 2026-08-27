# ReisTech — Site Institucional

Site institucional estático (HTML/CSS/JS puro, sem build step) para a ReisTech.

## Como rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer
servidor estático, por exemplo:

```bash
python3 -m http.server 8000
```

e acesse `http://localhost:8000`.

## Assets

Coloque os seus arquivos aqui, com exatamente estes nomes:

```
assets/logo.png        → logo da ReisTech (usada no header e no footer)
assets/mascote.png      → arte do Lion King (Hero e página lion-king.html)
assets/instagram.png    → ícone do Instagram (seção de feedbacks)
```

Enquanto esses arquivos não existirem, o site exibe automaticamente um
substituto discreto (wordmark "ReisTech" no lugar da logo, e uma moldura
tracejada indicando onde a arte do mascote deve entrar) — nada quebra
visualmente, mas troque pelos arquivos reais antes de publicar.

## Links a preencher manualmente

Os seguintes pontos foram deixados como placeholder, para você preencher:

- `index.html` → `<a href="COLOQUE-SEU-LINK-AQUI">` (link do portfólio de João Reis, seção Sobre)
- Footer de todas as páginas → WhatsApp, Instagram e e-mail de contato
- `orcamento.html` → mesmos contatos, na coluna lateral do formulário

## Estrutura

```
/reistech
├── index.html
├── orcamento.html
├── lion-king.html
├── css/
│   ├── global.css      (tokens, tipografia, botões, footer — compartilhado)
│   ├── header.css       (header flutuante + menu mobile — compartilhado)
│   ├── home.css         (hero, marquee, serviços, sobre, feedbacks, FAQ, CTA)
│   ├── orcamento.css    (formulário de orçamento)
│   └── lion-king.css    (página do mascote)
├── js/
│   ├── main.js           (ano do footer, scroll suave com offset de header)
│   ├── header.js         (header flutuante, esconder/mostrar, menu mobile)
│   ├── animations.js     (scroll reveal, parallax sutil, accordions)
│   ├── testimonials.js   (fundo animado — canvas de baixa opacidade)
│   └── orcamento.js      (pré-preenchimento por URL, validação, envio)
└── assets/               (logo.png, mascote.png, instagram.png)
```

## Formulário de orçamento

`js/orcamento.js` simula o envio (sem backend). Para conectar a um backend
real, troque o bloco `await new Promise(...)` em `orcamento.js` pela sua
chamada real (`fetch('/api/orcamento', { method: 'POST', ... })`, um serviço
como Formspree, uma automação n8n, etc).

Cada botão "Solicitar orçamento" do site pode linkar para
`orcamento.html?servico=web` (ou `celular`, `console`, `upgrade`, `pc`,
`notebook`, `outro`) para pré-selecionar o tipo de serviço no formulário.

## Acessibilidade e performance

- Respeita `prefers-reduced-motion` (desliga scroll reveals, parallax e o
  canvas de fundo da seção de feedbacks).
- Navegação por teclado com foco visível em todos os elementos interativos.
- Contraste testado sobre o fundo escuro (texto principal `#f4f2f7`, texto
  secundário `#a49dae`).
- Sem frameworks pesados — apenas HTML/CSS/JS nativos.
