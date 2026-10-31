import { Link } from "react-router-dom";
import { SITE, whatsappLink } from "../config/site.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand">SkinByWura</span>
          <p>Bold, joyful skincare curated for melanin-rich skin. Hand-picked from brands we trust.</p>
          <div className="footer-social">
            {SITE.instagram && <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>}
            {SITE.tiktok && <a href={SITE.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">TT</a>}
            {SITE.twitter && <a href={SITE.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)">X</a>}
            {SITE.whatsapp && <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>}
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=Serum">Serums</Link></li>
            <li><Link to="/products?category=Moisturiser">Moisturisers</Link></li>
            {SITE.showReviews && <li><Link to="/reviews">Reviews</Link></li>}
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

        <div className="footer-col">
          <h4>Need help?</h4>
          <ul>
            <li><Link to="/contact">Send us a message</Link></li>
            {SITE.contactEmail && <li><a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></li>}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} SkinByWura. All rights reserved.</p>
        <p>{SITE.location}</p>
      </div>
    </footer>
  );
}
