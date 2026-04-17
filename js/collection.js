import { getCollection, removeFromCollection } from "./storage.js";

function formatPrice(value) {
  const number = Number(value);
  return Number.isNaN(number) ? "N/A" : `$${number.toFixed(2)}`;
}

function displayCollection() {
  const container = document.getElementById("collectionList");
  const collection = getCollection();

  container.innerHTML = "";

  if (!collection.length) {
    container.innerHTML = "<p>No purchased cards in your collection yet.</p>";
    return;
  }

  collection.forEach((card) => {
    const article = document.createElement("article");
    article.classList.add("card");

    article.innerHTML = `
      <img src="${card.card_image}" alt="${card.card_name}" loading="lazy" />
      <h3>${card.card_name}</h3>
      <p><strong>Set:</strong> ${card.set_name || "Unknown"}</p>
      <p><strong>Price:</strong> ${formatPrice(card.market_price)}</p>
      <p><strong>Quantity:</strong> ${card.quantity || 1}</p>
      <button class="remove-btn">Remove from Collection</button>
    `;

    article.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCollection(card.card_image_id);
      displayCollection();
    });

    container.appendChild(article);
  });
}

displayCollection();