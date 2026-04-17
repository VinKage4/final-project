// ==============================
// UI.JS
// Responsible for displaying card data in the browser
// ==============================
import { saveFavorite, addToCart } from "./storage.js";
// Format price into readable currency
function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "N/A";
  }

  return `$${number.toFixed(2)}`;
}
// Display cards on the page
export function displayCards(cards) {
  const results = document.getElementById("cardResults");
  results.innerHTML = "";

  if (!cards.length) {
    results.innerHTML = "<p>No cards found.</p>";
    return;
  }

  cards.forEach((card) => {
    const article = document.createElement("article");
    article.classList.add("card");

    article.innerHTML = `
      <img
        src="${card.card_image || "https://via.placeholder.com/223x310?text=No+Image"}"
        alt="${card.card_name || "One Piece card"}"
        loading="lazy"
      />
      <h3>${card.card_name || "Unknown Card"}</h3>
      <p><strong>Card Code:</strong> ${card.card_set_id || "N/A"}</p>
      <p><strong>Set:</strong> ${card.set_name || "Unknown"}</p>
      <p><strong>Type:</strong> ${card.card_type || "Unknown"}</p>
      <p><strong>Color:</strong> ${card.card_color || "Unknown"}</p>
      <p><strong>Rarity:</strong> ${card.rarity || "Unknown"}</p>
      <p><strong>Market Price:</strong> ${formatPrice(card.market_price)}</p>

      <div class="card-actions">
        <button class="favorite-btn">Add to Favorites</button>
        <button class="cart-btn">Add to Cart</button>
      </div>
    `;

    article.querySelector(".favorite-btn").addEventListener("click", () => {
      saveFavorite(card);
      alert(`${card.card_name} added to favorites.`);
    });

    article.querySelector(".cart-btn").addEventListener("click", () => {
      addToCart(card);
      alert(`${card.card_name} added to cart.`);
    });

    results.appendChild(article);
  });
}
// Display messages (loading, errors, results)
export function showMessage(text) {
  const message = document.getElementById("message");
  message.textContent = text;
}