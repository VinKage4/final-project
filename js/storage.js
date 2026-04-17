// ==============================
// STORAGE.JS
// Handles saving and retrieving data from localStorage
// ==============================

const FAVORITES_KEY = "onePieceFavorites";
const CART_KEY = "onePieceCart";
const COLLECTION_KEY = "onePieceCollection";

// ------------------------------
// FAVORITES
// ------------------------------
export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorite(card) {
  const favorites = getFavorites();

  const existing = favorites.find(
    (item) => item.card_image_id === card.card_image_id
  );

  if (!existing) {
    favorites.push(card);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(cardImageId) {
  const favorites = getFavorites().filter(
    (card) => card.card_image_id !== cardImageId
  );

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// ------------------------------
// CART
// ------------------------------
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

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

export function removeFromCart(cardImageId) {
  const cart = getCart().filter(
    (card) => card.card_image_id !== cardImageId
  );

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// ------------------------------
// COLLECTION
// ------------------------------
export function getCollection() {
  return JSON.parse(localStorage.getItem(COLLECTION_KEY)) || [];
}

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

export function removeFromCollection(cardImageId) {
  const collection = getCollection().filter(
    (card) => card.card_image_id !== cardImageId
  );

  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}