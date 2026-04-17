import {
  getCart,
  removeFromCart,
  clearCart,
  addToCollection
} from "./storage.js";

function formatPrice(value) {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
}

function renderCart() {
  const container = document.getElementById("cartList");
  const totalElement = document.getElementById("cartTotal");
  const cart = getCart();

  container.innerHTML = "";

  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  cart.forEach((card) => {
    const price = formatPrice(card.market_price);
    total += price * (card.quantity || 1);

    const article = document.createElement("article");
    article.classList.add("card");

    article.innerHTML = `
      <img src="${card.card_image}" alt="${card.card_name}" loading="lazy" />
      <h3>${card.card_name}</h3>
      <p><strong>Price:</strong> $${price.toFixed(2)}</p>
      <p><strong>Quantity:</strong> ${card.quantity || 1}</p>

      <div class="card-actions">
        <button class="buy-btn">Purchase</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    article.querySelector(".buy-btn").addEventListener("click", () => {
      addToCollection(card);
      removeFromCart(card.card_image_id);
      renderCart();
    });

    article.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(card.card_image_id);
      renderCart();
    });

    container.appendChild(article);
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById("buyAllBtn").addEventListener("click", () => {
  const cart = getCart();

  cart.forEach((card) => {
    addToCollection(card);
  });

  clearCart();
  renderCart();
});

renderCart();