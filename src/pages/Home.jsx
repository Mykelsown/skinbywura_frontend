import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ticker from "../components/Ticker.jsx";
import ProductCard from "../components/ProductCard.jsx";
import reviews from "../data/reviews.js";
import { SITE } from "../config/site.js";
import { fetchProducts } from "../lib/api.js";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (active) setProducts(data);
      } catch (error) {
        console.error("Failed to load featured products", error);
        if (active) setProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  // Badged products first (set in the catalogue), then fill up with the rest.
  const badged = products.filter((p) => p.badge);
  const unbadged = products.filter((p) => !p.badge);
  const featured = [...badged, ...unbadged].slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Curated in Lagos, worn everywhere</span>
            <h1>
              Skin that glows <em>louder</em> than the room.
            </h1>
            <p>
              SkinByWura hand-picks skincare from brands we trust and brings it to you in one
              place, so building a routine that suits your skin is simple.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-coral">Shop the drop</Link>
              <Link to="/about" className="btn btn-outline">Our story</Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>Curated</strong>
                <span>Hand-picked brands</span>
              </div>
              <div>
                <strong>Simple</strong>
                <span>Track your orders online</span>
              </div>
              <div>
                <strong>Human</strong>
                <span>Support by email</span>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <img src="/images/hero-image.jpg" alt="SkinByWura model with glowing skin" />
            <span className="hero-sticker badge badge-lime">New in ✦</span>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fan favourites</span>
            <h2>Start here</h2>
            <p>A few picks from the shelf.</p>
          </div>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid-products">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          <div className="section-cta">
            <Link to="/products" className="btn">View all products</Link>
          </div>
        </div>
      </section>

      <section className="section story-strip">
        <div className="container story-grid">
          <div className="story-media">
            <img src="/images/our-story-image.webp" alt="SkinByWura curated skincare lineup" />
          </div>
          <div className="story-copy">
            <span className="eyebrow">Why we exist</span>
            <h2>Sourced for skin that's been told "that won't work for you."</h2>
            <p>
              Finding skincare that works for melanin-rich skin shouldn't take guesswork. SkinByWura
              brings together products from brands we trust, so you can shop them in one place.
            </p>
            <Link to="/about" className="btn btn-outline">Read the full story</Link>
          </div>
        </div>
      </section>

      <Ticker words={["CURATED SKINCARE", "TRUSTED BRANDS", "BUILT FOR YOUR ROUTINE", "GLOW YOUR WAY"]} />

      {SITE.showReviews && (
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">From the community</span>
            <h2>It's giving glow</h2>
          </div>
          <div className="review-teaser-grid">
            {reviews.slice(0, 3).map((r) => (
              <div className="review-teaser-card" key={r.id}>
                <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <p className="review-teaser-title">{r.title}</p>
                <p className="review-teaser-body">{r.body}</p>
                <p className="review-teaser-name">{r.name} · {r.location}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/reviews" className="btn btn-outline">Read all reviews</Link>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
