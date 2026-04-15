import { saveFavorite } from "./storage.js";

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
      <img src="${card.images?.small || ""}" alt="${card.name}" />
      <h3>${card.name}</h3>
      <p><strong>Type:</strong> ${card.supertype || "Unknown"}</p>
      <p><strong>Set:</strong> ${card.set?.name || "Unknown"}</p>
      <button class="favorite-btn">Add to Favorites</button>
    `;

    const button = article.querySelector(".favorite-btn");
    button.addEventListener("click", () => {
      saveFavorite(card);
      alert(`${card.name} added to favorites.`);
    });

    results.appendChild(article);
  });
}

export function showMessage(text) {
  const message = document.getElementById("message");
  message.textContent = text;
}