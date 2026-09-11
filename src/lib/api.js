// ---------------------------------------------------------------------------
// API abstraction layer.
//
// Live product calls route to the Go backend while the rest of the app remains
// backed by localStorage until the other endpoints are implemented.
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  cart: "sbw_cart",
  wishlist: "sbw_wishlist",
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

// ---- Auth ---------------------------------------------------------------

async function parseError(response, fallbackMessage) {
  try {
    const payload = await response.json();
    return payload?.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function getCurrentUser() {
  const response = await fetch("/api/auth/me", { credentials: "include" });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(await parseError(response, "Unable to load account"));
  }

  return response.json();
}

export async function login({ email, password }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "invalid email or password"));
  }

  return response.json();
}

export async function signup({ name, email, password }) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Unable to create account"));
  }

  return response.json();
}

export async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to log out"));
  }

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
