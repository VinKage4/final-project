const FAVORITES_KEY = "onePieceFavorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorite(card) {
  const favorites = getFavorites();

  const exists = favorites.some((fav) => fav.id === card.id);
  if (!exists) {
    favorites.push(card);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(cardId) {
  const favorites = getFavorites().filter((card) => card.id !== cardId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}