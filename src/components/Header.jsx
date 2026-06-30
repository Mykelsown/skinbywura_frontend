import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, openCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header className="site-header">
      <div className="container site-header-row">
        <Link to="/" className="brand">
          SkinByWura
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <SearchIcon />
          </button>
          <Link
            to={user ? "/profile" : "/login"}
            className="icon-btn"
            aria-label={user ? "Your account" : "Sign in"}
          >
            <UserIcon />
          </Link>
          <button className="icon-btn cart-btn" aria-label="Open cart" onClick={openCart}>
            <CartIcon />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
          <button
            className="icon-btn menu-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <form className="container search-form" onSubmit={handleSearchSubmit}>
            <SearchIcon />
            <input
              autoFocus
              type="search"
              placeholder="Search serums, oils, masks…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
              Close
            </button>
          </form>
        </div>
      )}

      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        <div className="mobile-menu-head">
          <span className="brand">SkinByWura</span>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to={user ? "/profile" : "/login"} onClick={() => setMenuOpen(false)} className="mobile-nav-link">
            {user ? "My account" : "Sign in"}
          </NavLink>
        </nav>
      </div>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.7 12.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
