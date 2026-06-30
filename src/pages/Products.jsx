import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import products, { categories } from "../data/products.js";
import "./Products.css";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [filterOpen, setFilterOpen] = useState(false);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    switch (sort) {
      case "price-low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [category, sort, maxPrice, query]);

  function selectCategory(cat) {
    setCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="section products-page">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Full catalogue</span>
          <h2>{query ? `Results for "${query}"` : "Shop everything"}</h2>
          <p>Filter by category, skin concern or budget, and let your routine pick itself.</p>
        </div>

        <div className="products-toolbar">
          <button className="btn btn-sm btn-outline filter-toggle" onClick={() => setFilterOpen((s) => !s)}>
            Filters {filterOpen ? "▲" : "▼"}
          </button>
          <div className="sort-control">
            <label htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={filterOpen ? "products-layout filters-open" : "products-layout"}>
          <aside className="filters-panel">
            <h4>Category</h4>
            <ul className="filter-list">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    className={c === category ? "filter-pill active" : "filter-pill"}
                    onClick={() => selectCategory(c)}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>

            <h4>Max price</h4>
            <input
              type="range"
              min="4000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <p className="filter-price-label">Up to ₦{maxPrice.toLocaleString()}</p>
          </aside>

          <div className="products-results">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>No products match yet</h3>
                <p>Try widening your price range or picking a different category.</p>
              </div>
            ) : (
              <div className="grid-products">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
