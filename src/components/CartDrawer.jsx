import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { checkout } from "../lib/api.js";
import { formatNaira } from "../lib/format.js";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, removeItem, updateQty, clearCart } = useCart();
  const [checkoutState, setCheckoutState] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    setCheckoutState({ type: "idle", message: "" });

    try {
      await checkout();
      clearCart();
      setCheckoutState({ type: "success", message: "Order placed successfully!" });
    } catch (error) {
      setCheckoutState({ type: "error", message: error.message || "Unable to complete checkout" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={isCartOpen ? "cart-overlay open" : "cart-overlay"}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />
      <aside className={isCartOpen ? "cart-panel open" : "cart-panel"} aria-label="Shopping cart">
        <div className="cart-panel-head">
          <h3>Your bag {items.length > 0 && `(${items.length})`}</h3>
          <button className="icon-close" onClick={closeCart} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty.</p>
            <Link to="/products" className="btn btn-coral btn-sm" onClick={closeCart}>
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{formatNaira(item.price)}</p>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-panel-foot">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>{formatNaira(subtotal)}</strong>
            </div>
            <p className="cart-note">Shipping and taxes calculated at checkout.</p>
            {checkoutState.type !== "idle" && (
              <p className={checkoutState.type === "success" ? "account-success" : "account-error"}>
                {checkoutState.message}
              </p>
            )}
            <button className="btn btn-coral" style={{ width: "100%" }} onClick={handleCheckout} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Checkout"}
            </button>
            <Link to="/products" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={closeCart}>
              Continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
