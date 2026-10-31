import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { formatNaira } from "../lib/format.js";
import { SITE } from "../config/site.js";
import "./CartDrawer.css";

const EMPTY_DETAILS = { name: "", phone: "", address: "", city: "", state: "", notes: "" };

export default function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, removeItem, updateQty, placeOrder } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState("bag"); // bag | details | done
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placed, setPlaced] = useState(null);

  function update(field) {
    return (e) => setDetails((d) => ({ ...d, [field]: e.target.value }));
  }

  function close() {
    closeCart();
    // Reset the flow after the drawer slides away, but keep the confirmation visible until then.
    if (step === "done") {
      setStep("bag");
      setPlaced(null);
    }
  }

  function startCheckout() {
    setError("");
    setDetails((d) => ({ ...d, name: d.name || user?.name || "" }));
    setStep("details");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const order = await placeOrder(details);
      setPlaced(order);
      setDetails(EMPTY_DETAILS);
      setStep("done");
    } catch (err) {
      setError(err.message || "Unable to place your order");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className={isCartOpen ? "cart-overlay open" : "cart-overlay"} onClick={close} aria-hidden={!isCartOpen} />
      <aside className={isCartOpen ? "cart-panel open" : "cart-panel"} aria-label="Shopping cart">
        <div className="cart-panel-head">
          <h3>
            {step === "details" ? "Delivery details" : step === "done" ? "Order placed" : "Your bag"}
            {step === "bag" && items.length > 0 && ` (${items.length})`}
          </h3>
          <button className="icon-close" onClick={close} aria-label="Close cart">×</button>
        </div>

        {step === "done" && (
          <div className="cart-done">
            <p className="cart-done-title">Thank you{placed?.ship_name ? `, ${placed.ship_name.split(" ")[0]}` : ""}!</p>
            <p>
              Order <strong>#{placed?.id}</strong> for <strong>{formatNaira(placed?.total || 0)}</strong> has been
              received. A confirmation email is on its way.
            </p>
            <p className="cart-note">{SITE.paymentNote}</p>
            <Link to="/profile" className="btn btn-coral" style={{ width: "100%" }} onClick={close}>
              View my orders
            </Link>
            <Link to="/products" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={close}>
              Keep shopping
            </Link>
          </div>
        )}

        {step === "bag" && items.length === 0 && (
          <div className="cart-empty">
            <p>Your bag is empty.</p>
            <Link to="/products" className="btn btn-coral btn-sm" onClick={close}>Start shopping</Link>
          </div>
        )}

        {step === "bag" && items.length > 0 && (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{formatNaira(item.price)}</p>
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, Math.min(99, item.qty + 1))} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-panel-foot">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatNaira(subtotal)}</strong>
              </div>
              <p className="cart-note">{SITE.paymentNote}</p>
              <button className="btn btn-coral" style={{ width: "100%" }} onClick={startCheckout}>
                Checkout
              </button>
              <Link to="/products" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={close}>
                Continue shopping
              </Link>
            </div>
          </>
        )}

        {step === "details" && (
          <form className="cart-details" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="co-name">Full name</label>
              <input id="co-name" required maxLength={80} value={details.name} onChange={update("name")} autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="co-phone">Phone number</label>
              <input id="co-phone" type="tel" required minLength={7} maxLength={30} value={details.phone} onChange={update("phone")} autoComplete="tel" />
            </div>
            <div className="form-field">
              <label htmlFor="co-address">Delivery address</label>
              <input id="co-address" required maxLength={300} value={details.address} onChange={update("address")} autoComplete="street-address" />
            </div>
            <div className="cart-details-row">
              <div className="form-field">
                <label htmlFor="co-city">City</label>
                <input id="co-city" required maxLength={80} value={details.city} onChange={update("city")} autoComplete="address-level2" />
              </div>
              <div className="form-field">
                <label htmlFor="co-state">State</label>
                <input id="co-state" required maxLength={80} value={details.state} onChange={update("state")} autoComplete="address-level1" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="co-notes">Notes (optional)</label>
              <textarea id="co-notes" rows="2" maxLength={500} value={details.notes} onChange={update("notes")} />
            </div>

            {error && <p className="account-error" role="alert">{error}</p>}

            <div className="cart-subtotal">
              <span>Total</span>
              <strong>{formatNaira(subtotal)}</strong>
            </div>
            <p className="cart-note">{SITE.paymentNote}</p>
            <button className="btn btn-coral" type="submit" style={{ width: "100%" }} disabled={isSubmitting}>
              {isSubmitting ? "Placing order..." : "Place order"}
            </button>
            <button type="button" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={() => setStep("bag")} disabled={isSubmitting}>
              Back to bag
            </button>
          </form>
        )}
      </aside>
    </>
  );
}
