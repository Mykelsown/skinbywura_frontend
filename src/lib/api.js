// ---------------------------------------------------------------------------
// API abstraction layer.
//
// Live product calls route to the Go backend while the rest of the app remains
// backed by localStorage until the other endpoints are implemented.
// ---------------------------------------------------------------------------

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

function normalizeProduct(product = {}) {
  return {
    ...product,
    id: product.id,
    image: product.image ?? product.image_url ?? "",
    compareAtPrice: product.compareAtPrice ?? product.compare_at_price ?? null,
    reviewCount: product.reviewCount ?? product.review_count ?? 0,
    skinType: product.skinType ?? product.skin_type ?? "",
    tags: Array.isArray(product.tags) ? product.tags : [],
  };
}

function normalizeProducts(data) {
  if (Array.isArray(data)) return data.map(normalizeProduct);
  if (Array.isArray(data?.products)) return data.products.map(normalizeProduct);
  return [];
}

export async function fetchProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = await response.json();
  return normalizeProducts(data);
}

export async function fetchProductById(id) {
  const response = await fetch(`/api/products/${id}`);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch product ${id}: ${response.status}`);
  }

  const data = await response.json();
  return normalizeProduct(data);
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
