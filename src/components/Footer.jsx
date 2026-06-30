import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand">SkinByWura</span>
          <p>Bold, joyful skincare curated for melanin-rich skin. Hand-picked from trusted makers, shipped from Lagos.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="TikTok">TT</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="WhatsApp">WA</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=Serums">Serums</Link></li>
            <li><Link to="/products?category=Moisturisers">Moisturisers</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Stay in the glow</h4>
          <p>New drops, restocks and skin tips, once a week.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
            }}
          >
            <input type="email" required placeholder="you@email.com" aria-label="Email address" />
            <button className="btn btn-lime btn-sm" type="submit">Join</button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} SkinByWura. All rights reserved.</p>
        <p>Lagos, Nigeria</p>
      </div>
    </footer>
  );
}
