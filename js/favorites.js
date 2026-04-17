import {
  getFavorites,
  removeFavorite,
  addToCart
} from "./storage.js";

function formatPrice(value) {
  const number = Number(value);
  return Number.isNaN(number) ? "N/A" : `$${number.toFixed(2)}`;
}

function displayFavorites() {
  const container = document.getElementById("favoritesList");
  const favorites = getFavorites();

  container.innerHTML = "";

  if (!favorites.length) {
    container.innerHTML = "<p>No favorite cards saved yet.</p>";
    return;
  }

  favorites.forEach((card) => {
    const article = document.createElement("article");
    article.classList.add("card");

    article.innerHTML = `
      <img src="${card.card_image}" alt="${card.card_name}" loading="lazy" />
      <h3>${card.card_name}</h3>
      <p><strong>Set:</strong> ${card.set_name || "Unknown"}</p>
      <p><strong>Market Price:</strong> ${formatPrice(card.market_price)}</p>

      <div class="card-actions">
        <button class="cart-btn">Move to Cart</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    article.querySelector(".cart-btn").addEventListener("click", () => {
      addToCart(card);
      removeFavorite(card.card_image_id);
      displayFavorites();
    });

    article.querySelector(".remove-btn").addEventListener("click", () => {
      removeFavorite(card.card_image_id);
      displayFavorites();
    });

    container.appendChild(article);
  });
}

displayFavorites();