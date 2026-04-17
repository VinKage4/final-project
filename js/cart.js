// ==============================
// CART.JS
// Handles displaying cart items, removing items, 
// and purchasing cards (moving them to collection)
// ==============================

import {
  getCart,
  removeFromCart,
  clearCart,
  addToCollection
} from "./storage.js";

// ==============================
// Show a temporary success message
// when a card is purchased
// ==============================
function showSuccessMessage(text) {
  const msg = document.createElement("div");
  msg.classList.add("success-message");
  msg.textContent = text;

  // Add message to page
  document.body.appendChild(msg);

  // Trigger animation
  setTimeout(() => {
    msg.classList.add("show");
  }, 50);

  // Remove message after a short delay
  setTimeout(() => {
    msg.classList.remove("show");
    setTimeout(() => msg.remove(), 300);
  }, 2000);
}

// ==============================
// Render all items in the cart
// ==============================
function renderCart() {
  const container = document.getElementById("cartList");
  const totalElement = document.getElementById("cartTotal");

  // Get cart data from localStorage
  const cart = getCart();

  // Clear current display
  container.innerHTML = "";

  // If cart is empty, show message
  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  // Loop through each card in the cart
  cart.forEach((card) => {
    const price = Number(card.market_price) || 0;

    // Add to total price
    total += price * (card.quantity || 1);

    // Create card container
    const article = document.createElement("article");
    article.classList.add("card");

    // Build card UI
    article.innerHTML = `
      <img src="${card.card_image}" alt="${card.card_name}" loading="lazy" />
      <h3>${card.card_name}</h3>
      <p><strong>Price:</strong> $${price.toFixed(2)}</p>
      <p><strong>Quantity:</strong> ${card.quantity || 1}</p>

      <div class="card-actions">
        <button class="buy-btn">Purchase</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    // ==============================
    // PURCHASE BUTTON
    // ==============================
    article.querySelector(".buy-btn").addEventListener("click", () => {

      // Add animation class to card
      article.classList.add("purchased");

      // Show success message to user
      showSuccessMessage(`${card.card_name} purchased!`);

      // Wait for animation before removing card
      setTimeout(() => {
        addToCollection(card); // move to collection
        removeFromCart(card.card_image_id); // remove from cart
        renderCart(); // refresh cart UI
      }, 600);
    });

    // ==============================
    // REMOVE BUTTON
    // ==============================
    article.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(card.card_image_id);
      renderCart();
    });

    // Add card to page
    container.appendChild(article);
  });

  // Update total price display
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// ==============================
// PURCHASE ALL BUTTON
// Moves all items from cart to collection
// ==============================
document.getElementById("buyAllBtn").addEventListener("click", () => {
  const cart = getCart();

  // Add all items to collection
  cart.forEach((card) => {
    addToCollection(card);
  });

  // Show confirmation message
  showSuccessMessage("All cards purchased!");

  // Clear cart and refresh UI
  clearCart();
  renderCart();
});

// ==============================
// INITIAL LOAD
// Display cart when page loads
// ==============================
renderCart();