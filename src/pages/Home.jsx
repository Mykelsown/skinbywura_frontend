import { Link } from "react-router-dom";
import Ticker from "../components/Ticker.jsx";
import ProductCard from "../components/ProductCard.jsx";
import products from "../data/products.js";
import reviews from "../data/reviews.js";
import "./Home.css";

const featured = products.filter((p) => p.badge === "Best Seller").concat(
  products.filter((p) => p.badge === "New")
).slice(0, 4);

export default function Home() {
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
              SkinByWura hand-picks clinical-grade skincare from trusted producers and brings it
              to you in one place. No filler ingredients, no whispering, just visible glow from week one.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-coral">Shop the drop</Link>
              <Link to="/about" className="btn btn-outline">Our story</Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>12k+</strong>
                <span>Glowed-up customers</span>
              </div>
              <div>
                <strong>4.8★</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Cruelty-free</span>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <img src="/images/hero-image.jpg" alt="SkinByWura model with glowing skin" />
            <span className="hero-sticker badge badge-lime">Fresh drop ✦ this week</span>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fan favourites</span>
            <h2>The shelf everyone's restocking</h2>
            <p>The four products our community can't stop reordering, picked fresh this month.</p>
          </div>
          <div className="grid-products">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
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
              We started SkinByWura after years of struggling to find products that actually
              respected melanin-rich skin. So we built a marketplace instead, vetting every brand
              we stock and testing each product on real Nigerian skin tones, in real Lagos
              humidity, before it ever reaches your bathroom shelf.
            </p>
            <Link to="/about" className="btn btn-outline">Read the full story</Link>
          </div>
        </div>
      </section>

      <Ticker words={["NO PARABENS", "NO SULFATES", "DERMATOLOGIST APPROVED", "VETTED BRANDS", "REAL RESULTS"]} />

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
    </div>
  );
}
