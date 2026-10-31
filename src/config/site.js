// Everything the shop owner may need to change without touching components.
// Values come from environment variables (set in Vercel > Settings > Environment Variables).
// Anything left empty is simply not shown, so the site never displays made-up details.

const env = import.meta.env;

export const SITE = {
  name: "SkinByWura",
  contactEmail: env.VITE_CONTACT_EMAIL || "",
  contactPhone: env.VITE_CONTACT_PHONE || "",
  // A WhatsApp number in international format without + or spaces, e.g. 2348012345678.
  whatsapp: env.VITE_WHATSAPP_NUMBER || "",
  location: env.VITE_STORE_LOCATION || "Lagos, Nigeria",
  instagram: env.VITE_INSTAGRAM_URL || "",
  tiktok: env.VITE_TIKTOK_URL || "",
  twitter: env.VITE_TWITTER_URL || "",
  // Shown in the cart. Be honest about what happens after an order is placed.
  paymentNote:
    env.VITE_PAYMENT_NOTE ||
    "We'll email you payment and delivery details after you place your order.",
  // Turn on only when you have real customer reviews to show.
  showReviews: env.VITE_SHOW_REVIEWS === "true",
};

export function whatsappLink() {
  return SITE.whatsapp ? `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}` : "";
}
