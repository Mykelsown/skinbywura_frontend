// ---------------------------------------------------------------------------
// API abstraction layer.
//
// Every function here returns a Promise and talks to localStorage for now.
// When a real backend is ready, swap the body of each function for a
// `fetch("/api/...")` call — nothing in the components or context providers
// needs to change, since they only ever call through this module.
// ---------------------------------------------------------------------------

import productCatalogue from "../data/products.js";

const STORAGE_KEYS = {
  cart: "sbw_cart",
  wishlist: "sbw_wishlist",
  user: "sbw_user",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable, fail silently */
  }
}

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---- Products --------------------------------------------------------

export async function fetchProducts() {
  await delay();
  return productCatalogue;
}

export async function fetchProductById(id) {
  await delay();
  return productCatalogue.find((p) => p.id === id) || null;
}

// ---- Cart --------------------------------------------------------------

export async function getCart() {
  await delay(80);
  return read(STORAGE_KEYS.cart, []);
}

export async function saveCart(items) {
  await delay(80);
  write(STORAGE_KEYS.cart, items);
  return items;
}

// ---- Wishlist ------------------------------------------------------------

export async function getWishlist() {
  await delay(80);
  return read(STORAGE_KEYS.wishlist, []);
}

export async function saveWishlist(items) {
  await delay(80);
  write(STORAGE_KEYS.wishlist, items);
  return items;
}

// ---- Auth (mock) -----------------------------------------------------

export async function getCurrentUser() {
  await delay(80);
  return read(STORAGE_KEYS.user, null);
}

export async function login({ email }) {
  await delay(400);
  const user = { email, name: email.split("@")[0], joined: new Date().toISOString() };
  write(STORAGE_KEYS.user, user);
  return user;
}

export async function signup({ name, email }) {
  await delay(400);
  const user = { name, email, joined: new Date().toISOString() };
  write(STORAGE_KEYS.user, user);
  return user;
}

export async function logout() {
  await delay(150);
  localStorage.removeItem(STORAGE_KEYS.user);
  return true;
}

export async function requestPasswordReset({ email }) {
  await delay(400);
  return { ok: true, email };
}

// ---- Contact -------------------------------------------------------------

export async function submitContactForm(payload) {
  await delay(500);
  // In production this would POST to /api/contact.
  return { ok: true, receivedAt: new Date().toISOString(), payload };
}
