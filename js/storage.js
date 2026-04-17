// ==============================
// STORAGE.JS
// Handles saving and retrieving data from localStorage
// ==============================

const CART_KEY = "onePieceCart";
const COLLECTION_KEY = "onePieceCollection";

// Get cart items
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Add item to cart
export function addToCart(card) {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.card_image_id === card.card_image_id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...card, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Get collection
export function getCollection() {
  return JSON.parse(localStorage.getItem(COLLECTION_KEY)) || [];
}

// Add purchased cards to collection
export function addToCollection(card) {
  const collection = getCollection();

  const existing = collection.find(
    (item) => item.card_image_id === card.card_image_id
  );

  if (existing) {
    existing.quantity += card.quantity || 1;
  } else {
    collection.push({ ...card, quantity: card.quantity || 1 });
  }

  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}