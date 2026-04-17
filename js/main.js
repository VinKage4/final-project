// ==============================
// MAIN.JS
// Controls loading cards, searching, sorting, and pagination
// ==============================

import { getAllSetCards } from "./api.js";
import { displayCards, showMessage } from "./ui.js";

// Get elements from the DOM
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const paginationContainer = document.getElementById("pagination");

// Store all cards and filtered results
let allCards = [];
let filteredCards = [];

// Track current page and how many cards per page
let currentPage = 1;
const cardsPerPage = 24;

// ==============================
// Initialize app and load cards
// ==============================
async function init() {
  try {
    showMessage("Loading cards...");
    allCards = await getAllSetCards(); // fetch cards from API
    filteredCards = [...allCards]; // copy into filtered array
    renderCurrentPage();
    showMessage(`Loaded ${filteredCards.length} cards.`);
  } catch (error) {
    console.error(error);
    showMessage("Could not load cards.");
  }
}

// ==============================
// Display cards for current page
// ==============================
function renderCurrentPage() {
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageCards = filteredCards.slice(start, end);

  displayCards(pageCards);
  renderPagination();
}

// ==============================
// Create pagination buttons
// ==============================
function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    if (i === currentPage) {
      button.classList.add("active-page");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    paginationContainer.appendChild(button);
  }
}

// ==============================
// Handle search input
// ==============================
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  // Filter cards based on name
  filteredCards = allCards.filter((card) =>
    card.card_name?.toLowerCase().includes(query)
  );

  currentPage = 1;
  renderCurrentPage();
  showMessage(`${filteredCards.length} card(s) found.`);
}

// ==============================
// Handle sorting options
// ==============================
function handleSort() {
  const value = sortSelect.value;

  if (value === "name-asc") {
    filteredCards.sort((a, b) =>
      (a.card_name || "").localeCompare(b.card_name || "")
    );
  } else if (value === "name-desc") {
    filteredCards.sort((a, b) =>
      (b.card_name || "").localeCompare(a.card_name || "")
    );
  } else if (value === "price-low") {
    filteredCards.sort(
      (a, b) => (Number(a.market_price) || 0) - (Number(b.market_price) || 0)
    );
  } else if (value === "price-high") {
    filteredCards.sort(
      (a, b) => (Number(b.market_price) || 0) - (Number(a.market_price) || 0)
    );
  }

  currentPage = 1;
  renderCurrentPage();
}

// Event listeners
searchBtn.addEventListener("click", handleSearch);
sortSelect.addEventListener("change", handleSort);

// Reset filters and show all cards
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "default";
  filteredCards = [...allCards];
  currentPage = 1;
  renderCurrentPage();
});

// Run app
init();