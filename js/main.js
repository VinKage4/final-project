import { searchCards } from "./api.js";
import { displayCards, showMessage } from "./ui.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

async function handleSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    showMessage("Please enter a card name.");
    return;
  }

  showMessage("Loading cards...");

  try {
    const cards = await searchCards(query);
    displayCards(cards);
    showMessage(`${cards.length} card(s) found.`);
  } catch (error) {
    showMessage("Something went wrong while loading cards.");
  }
}

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});