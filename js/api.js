// ==============================
// API.JS
// Handles fetching card data from the One Piece API
// ==============================
const BASE_URL = "https://optcgapi.com/api";

export async function getAllSetCards() {
  const response = await fetch(`${BASE_URL}/allSetCards/`);

  if (!response.ok) {
    throw new Error("Could not load cards.");
  }

  return await response.json();
}

export async function searchCardsByName(searchText) {
  const cards = await getAllSetCards();
  const query = searchText.trim().toLowerCase();

  return cards.filter((card) =>
    card.card_name?.toLowerCase().includes(query)
  );
}