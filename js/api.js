const API_URL = "https://api.pokemontcg.io/v2/cards?q=name:"; 
// Replace this with your real One Piece API endpoint later

export async function searchCards(cardName) {
  try {
    const response = await fetch(`${API_URL}${cardName}`);

    if (!response.ok) {
      throw new Error("Failed to fetch card data.");
    }

    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}