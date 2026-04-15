import { getFavorites, removeFavorite } from "./storage.js";

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
      <img src="${card.images?.small || ""}" alt="${card.name}" />
      <h3>${card.name}</h3>
      <p><strong>Type:</strong> ${card.supertype || "Unknown"}</p>
      <p><strong>Set:</strong> ${card.set?.name || "Unknown"}</p>
      <button>Remove</button>
    `;

    const button = article.querySelector("button");
    button.addEventListener("click", () => {
      removeFavorite(card.id);
      displayFavorites();
    });

    container.appendChild(article);
  });
}

displayFavorites();