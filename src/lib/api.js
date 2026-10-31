// ---------------------------------------------------------------------------
// API layer. Every network call in the app goes through this file.
// Paths are relative (/api/...): in development Vite proxies them to the Go server,
// in production Vercel rewrites them to the API, so cookies stay first-party.
// ---------------------------------------------------------------------------

async function parseError(response, fallbackMessage) {
  try {
    const payload = await response.json();
    return payload?.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

async function request(path, { method = "GET", body, fallback = "Something went wrong" } = {}) {
  let response;
  try {
    response = await fetch(path, {
      method,
      credentials: "include",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }
  return { response, fallback };
}

async function json(path, options) {
  const { response, fallback } = await request(path, options);
  if (!response.ok) throw new Error(await parseError(response, fallback));
  return response.json();
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
  const data = await json("/api/products", { fallback: "Unable to load products" });
  return normalizeProducts(data);
}

export async function fetchProductById(id) {
  const { response } = await request(`/api/products/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await parseError(response, "Unable to load product"));
  return normalizeProduct(await response.json());
}

// ---- Cart and wishlist (whole-list replace) ----------------------------

async function listOrEmpty(path, fallback) {
  const { response } = await request(path, { fallback });
  if (response.status === 401) return [];
  if (!response.ok) throw new Error(await parseError(response, fallback));
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export const getCart = () => listOrEmpty("/api/cart", "Unable to load cart");
export const getWishlist = () => listOrEmpty("/api/wishlist", "Unable to load wishlist");
export const fetchOrders = () => listOrEmpty("/api/orders", "Unable to load orders");

export async function saveCart(items) {
  const data = await json("/api/cart", { method: "PUT", body: items, fallback: "Unable to save cart" });
  return Array.isArray(data) ? data : [];
}

export async function saveWishlist(items) {
  const data = await json("/api/wishlist", { method: "PUT", body: items, fallback: "Unable to save wishlist" });
  return Array.isArray(data) ? data : [];
}

// ---- Orders ----------------------------------------------------------------

// details: { name, phone, address, city, state, notes }
export function checkout(details) {
  return json("/api/orders", { method: "POST", body: details, fallback: "Unable to place your order" });
}

// ---- Auth ---------------------------------------------------------------

export async function getCurrentUser() {
  const { response } = await request("/api/auth/me");
  if (response.status === 401) return null;
  if (!response.ok) throw new Error(await parseError(response, "Unable to load account"));
  return response.json();
}

export const login = ({ email, password }) =>
  json("/api/auth/login", { method: "POST", body: { email, password }, fallback: "Invalid email or password" });

export const signup = ({ name, email, password }) =>
  json("/api/auth/signup", { method: "POST", body: { name, email, password }, fallback: "Unable to create account" });

export async function logout() {
  await json("/api/auth/logout", { method: "POST", fallback: "Failed to log out" });
  return true;
}

export const updateProfile = ({ name }) =>
  json("/api/auth/me", { method: "PATCH", body: { name }, fallback: "Unable to save your name" });

export const changePassword = ({ currentPassword, newPassword }) =>
  json("/api/auth/change-password", {
    method: "POST",
    body: { current_password: currentPassword, new_password: newPassword },
    fallback: "Unable to change password",
  });

export const requestPasswordReset = ({ email }) =>
  json("/api/auth/forgot-password", { method: "POST", body: { email }, fallback: "Unable to send reset link" });

export const resetPassword = ({ token, newPassword }) =>
  json("/api/auth/reset-password", {
    method: "POST",
    body: { token, new_password: newPassword },
    fallback: "Unable to reset password",
  });

// ---- Contact -------------------------------------------------------------

export const submitContactForm = ({ name, email, topic, message }) =>
  json("/api/contact", { method: "POST", body: { name, email, topic, message }, fallback: "Unable to send your message" });
