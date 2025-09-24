document.getElementById("formOrcamento").addEventListener("submit", function(e) {
  e.preventDefault(); // Evita reload da página

  // Pega os dados do formulário
  const nome = this.nome.value;
  const email = this.email.value;
  const telefone = this.telefone.value;
  const servico = this.servico.options[this.servico.selectedIndex].text;
  const mensagem = this.mensagem.value;

  // Número do WhatsApp (coloque o seu aqui, no formato com DDI +55)
  const numeroWhats = "5561994503282"; // Exemplo: 5511999999999

  // Monta o texto da mensagem
  const texto = `📌 *Novo Orçamento*%0A
👤 Nome: ${nome}%0A
📧 Email: ${email}%0A
📞 Telefone: ${telefone ? telefone : "Não informado"}%0A
🛠 Serviço: ${servico}%0A
💬 Detalhes: ${mensagem}`;

  // Abre o WhatsApp
  window.open(`https://wa.me/556194503282`, "_blank");

  // Mostra mensagem de sucesso
  document.getElementById("msgSucesso").style.display = "block";

  // Limpar formulário
  this.reset();
});
