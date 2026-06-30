import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatNaira } from "../lib/format.js";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((w) => w.id === product.id);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`badge product-badge ${product.badge === "Sale" ? "badge-coral" : "badge-lime"}`}>
            {product.badge}
          </span>
        )}
        <button
          className={isWishlisted ? "wish-btn active" : "wish-btn"}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label="Toggle wishlist"
        >
          ♥
        </button>
      </Link>
      <div className="product-card-body">
        <div className="stars" aria-label={`Rated ${product.rating} out of 5`}>
          {"★".repeat(Math.round(product.rating))}
          {"☆".repeat(5 - Math.round(product.rating))}
          <span className="review-count">({product.reviewCount})</span>
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        <p className="product-card-type">{product.skinType}</p>
        <div className="product-card-foot">
          <div className="price-group">
            <span className="price">{formatNaira(product.price)}</span>
            {product.compareAtPrice && (
              <span className="price-compare">{formatNaira(product.compareAtPrice)}</span>
            )}
          </div>
          <button className="btn btn-sm" onClick={() => addItem(product)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
