import { getAllSetCards } from "./api.js";
import { displayCards, showMessage } from "./ui.js";

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const paginationContainer = document.getElementById("pagination");

let allCards = [];
let filteredCards = [];
let currentPage = 1;
const cardsPerPage = 24;

async function init() {
  try {
    showMessage("Loading cards...");
    allCards = await getAllSetCards();
    filteredCards = [...allCards];
    renderCurrentPage();
    showMessage(`Loaded ${filteredCards.length} cards.`);
  } catch (error) {
    console.error(error);
    showMessage("Could not load cards.");
  }
}

function renderCurrentPage() {
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageCards = filteredCards.slice(start, end);

  displayCards(pageCards);
  renderPagination();
}

function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = startPage + 3;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - 3);
  }

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.addEventListener("click", () => {
      currentPage--;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationContainer.appendChild(prevButton);
  }

  for (let i = startPage; i <= endPage; i++) {
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

  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
      currentPage++;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationContainer.appendChild(nextButton);
  }
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    filteredCards = [...allCards];
  } else {
    filteredCards = allCards.filter((card) =>
      card.card_name?.toLowerCase().includes(query)
    );
  }

  currentPage = 1;
  renderCurrentPage();
  showMessage(`${filteredCards.length} card(s) found.`);
}

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
  } else {
    filteredCards = [...filteredCards];
  }

  currentPage = 1;
  renderCurrentPage();
}

searchBtn.addEventListener("click", handleSearch);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "default";
  filteredCards = [...allCards];
  currentPage = 1;
  renderCurrentPage();
  showMessage(`Showing all ${filteredCards.length} cards.`);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

sortSelect.addEventListener("change", handleSort);

init();