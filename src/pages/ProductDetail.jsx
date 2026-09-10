import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import reviews from "../data/reviews.js";
import { useCart } from "../context/CartContext.jsx";
import { fetchProductById, fetchProducts } from "../lib/api.js";
import { formatNaira } from "../lib/format.js";
import ProductCard from "../components/ProductCard.jsx";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      try {
        const [productData, allData] = await Promise.all([
          fetchProductById(id),
          fetchProducts(),
        ]);

        if (active) {
          setProduct(productData);
          setAllProducts(allData);
        }
      } catch (error) {
        console.error("Failed to load product", error);
        if (active) {
          setProduct(null);
          setAllProducts([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="section"><div className="container"><p>Loading product...</p></div></div>;
  if (!product) return <Navigate to="/products" replace />;

  const related = allProducts.filter((p) => p.category === product.category && Number(p.id) !== Number(product.id)).slice(0, 4);
  const productReviews = reviews.filter((r) => r.productName === product.name);

  return (
    <div className="section product-detail">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/products">Shop</Link> / <span>{product.category}</span>
        </p>

        <div className="product-detail-grid">
          <div className="product-detail-media">
            <img src={product.image} alt={product.name} />
            {product.badge && <span className="badge badge-lime product-badge">{product.badge}</span>}
          </div>

          <div className="product-detail-info">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="stars" aria-label={`Rated ${product.rating} out of 5`}>
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
              <span className="review-count">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="price-row">
              <span className="price-large">{formatNaira(product.price)}</span>
              {product.compareAtPrice && (
                <span className="price-compare">{formatNaira(product.compareAtPrice)}</span>
              )}
            </div>

            <p className="product-detail-desc">{product.description}</p>

            <dl className="product-meta">
              <div>
                <dt>Volume</dt>
                <dd>{product.volume}</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{product.skinType}</dd>
              </div>
            </dl>

            <div className="add-to-cart-row">
              <div className="qty-control qty-control-lg">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="btn btn-coral" onClick={() => addItem(product, qty)}>
                Add to bag
              </button>
            </div>
          </div>
        </div>

        {productReviews.length > 0 && (
          <div className="product-reviews">
            <h2>What customers say</h2>
            <div className="review-teaser-grid">
              {productReviews.map((r) => (
                <div className="review-teaser-card" key={r.id}>
                  <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  <p className="review-teaser-title">{r.title}</p>
                  <p className="review-teaser-body">{r.body}</p>
                  <p className="review-teaser-name">{r.name} · {r.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="related-products">
            <h2>You might also like</h2>
            <div className="grid-products">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
