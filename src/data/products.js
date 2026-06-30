// Static product catalogue. In a real backend integration, `lib/api.js`
// would fetch this same shape from an endpoint like GET /api/products.
const products = [
  {
    id: "p1",
    name: "Glow Drop Vitamin C Serum",
    category: "Serums",
    tags: ["brightening", "best-seller"],
    price: 12500,
    compareAtPrice: 15000,
    rating: 4.8,
    reviewCount: 124,
    skinType: "All skin types",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&crop=center",
    description:
      "A featherweight 15% vitamin C serum that fades dark marks and locks in an even, lit-from-within glow. Picked for melanin-rich skin that wants brightness without irritation.",
    volume: "30ml",
  },
  {
    id: "p2",
    name: "Whipped Shea Glow Butter",
    category: "Moisturisers",
    tags: ["hydrating"],
    price: 9500,
    rating: 4.6,
    reviewCount: 89,
    skinType: "Dry & combination",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop&crop=center",
    description:
      "Unrefined shea butter whipped with jojoba and a hint of vanilla. Melts on contact and seals in moisture for up to 48 hours.",
    volume: "200g",
  },
  {
    id: "p3",
    name: "Bare Slate Gentle Cleansing Foam",
    category: "Cleansers",
    tags: ["sensitive-skin"],
    price: 7000,
    rating: 4.7,
    reviewCount: 156,
    skinType: "Sensitive skin",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&crop=center",
    description:
      "A pH-balanced, sulphate-free foam that lifts oil and sunscreen without stripping your skin barrier. Mornings and nights, no tightness.",
    volume: "150ml",
  },
  {
    id: "p4",
    name: "Clay Pull Detox Mask",
    category: "Masks",
    tags: ["pore-care"],
    price: 6000,
    compareAtPrice: 7500,
    rating: 4.5,
    reviewCount: 73,
    skinType: "Oily & acne-prone",
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=600&h=600&fit=crop&crop=center",
    description:
      "Kaolin and bentonite clay team up with niacinamide to draw out congestion and calm breakouts, leaving pores visibly tighter in 15 minutes.",
    volume: "100g",
  },
  {
    id: "p5",
    name: "Golden Hour Glow Oil",
    category: "Oils",
    tags: ["radiance", "best-seller"],
    price: 9500,
    rating: 4.9,
    reviewCount: 201,
    skinType: "All skin types",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop&crop=center",
    description:
      "A dry-touch facial oil with marula, tamanu and a whisper of shimmer. Wear it alone or mixed into your moisturiser for a lit, dewy finish.",
    volume: "50ml",
  },
  {
    id: "p6",
    name: "Cocoa Crush Body Scrub",
    category: "Body Care",
    tags: ["exfoliating"],
    price: 8000,
    rating: 4.4,
    reviewCount: 58,
    skinType: "All skin types",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop&crop=center",
    description:
      "Raw sugar, cocoa butter and coffee grounds buff away dry patches and ashiness, leaving skin smooth enough to skip lotion entirely.",
    volume: "250g",
  },
  {
    id: "p7",
    name: "Rice Water Brightening Toner",
    category: "Toners",
    tags: ["brightening", "hydrating"],
    price: 5500,
    rating: 4.6,
    reviewCount: 97,
    skinType: "All skin types",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop&crop=center",
    description:
      "Fermented rice water with niacinamide preps skin for the rest of your routine, refining texture and tone with every spritz.",
    volume: "150ml",
  },
  {
    id: "p8",
    name: "Midnight Recovery Night Cream",
    category: "Moisturisers",
    tags: ["repair"],
    price: 11000,
    rating: 4.7,
    reviewCount: 64,
    skinType: "Dry & mature",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=600&h=600&fit=crop&crop=center",
    description:
      "A rich, ceramide-packed cream that works while you sleep to repair the skin barrier and soften fine lines by morning.",
    volume: "50g",
  },
];

export default products;

export const categories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];
