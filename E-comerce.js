// Lista de produtos (Exemplo)
const produtos = [
  { id: 1, nome: "Teclado Gamer", preco: 199.90, img: "https://via.placeholder.com/150" },
  { id: 2, nome: "Mouse Gamer", preco: 149.90, img: "https://via.placeholder.com/150" },
  { id: 3, nome: "Headset", preco: 249.90, img: "https://via.placeholder.com/150" },
  { id: 4, nome: "Monitor 24\"", preco: 899.90, img: "https://via.placeholder.com/150" }
];

const produtosGrid = document.getElementById('produtos-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalDisplay = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

// Função para mostrar produtos
function displayProdutos() {
  produtos.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('produto');
    div.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="addToCart(${produto.id})">Adicionar ao Carrinho</button>
    `;
    produtosGrid.appendChild(div);
  });
}

// Função para adicionar ao carrinho
function addToCart(id) {
  const produto = produtos.find(p => p.id === id);
  const itemCart = cart.find(p => p.id === id);
  if (itemCart) {
    itemCart.quantidade += 1;
  } else {
    cart.push({...produto, quantidade: 1});
  }
  updateCart();
}

// Atualiza carrinho na tela
function updateCart() {
  cartItems.innerHTML = '';
  if(cart.length === 0){
    cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
  } else {
    cart.forEach(item => {
      const p = document.createElement('p');
      p.textContent = `${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
      cartItems.appendChild(p);
    });
  }
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantidade, 0);
  totalDisplay.textContent = `Total: R$ ${cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2)}`;
}

// Checkout simulado
checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso! (Simulação)");
  cart = [];
  updateCart();
});

// Inicializa
displayProdutos();
updateCart();
