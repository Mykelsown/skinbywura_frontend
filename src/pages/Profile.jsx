import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { fetchOrders } from "../lib/api.js";
import { formatNaira } from "../lib/format.js";
import "./Account.css";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const { wishlist } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetchOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]));
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="section account-page">
      <div className="container">
        <div className="account-head">
          <div>
            <span className="eyebrow">My account</span>
            <h1>Hi, {user.name || user.email.split("@")[0]} ✦</h1>
          </div>
          <button className="btn btn-outline btn-sm" onClick={logout}>Sign out</button>
        </div>

        <div className="account-grid">
          <div className="account-card">
            <h3>Account details</h3>
            <dl>
              <div><dt>Email</dt><dd>{user.email}</dd></div>
              <div><dt>Member since</dt><dd>{new Date(user.created_at || user.joined || Date.now()).toLocaleDateString()}</dd></div>
            </dl>
            <Link to="/settings" className="btn btn-sm" style={{ marginTop: 18 }}>Edit settings</Link>
          </div>

          <div className="account-card">
            <h3>Wishlist ({wishlist.length})</h3>
            {wishlist.length === 0 ? (
              <p className="account-empty">Tap the heart on any product to save it here.</p>
            ) : (
              <ul className="wishlist-list">
                {wishlist.map((w) => (
                  <li key={w.id}>
                    <span>{w.name}</span>
                    <span>{formatNaira(w.price)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="account-card">
            <h3>Orders</h3>
            {orders.length === 0 ? (
              <>
                <p className="account-empty">No orders yet. Once you check out, they'll show up here.</p>
                <Link to="/products" className="btn btn-sm" style={{ marginTop: 18 }}>Start shopping</Link>
              </>
            ) : (
              <ul className="wishlist-list">
                {orders.map((order) => {
                  const itemCount = order.items.reduce((sum, item) => sum + item.qty, 0);
                  return (
                    <li key={order.id}>
                      <div>
                        <strong>#{order.id}</strong>
                        <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span>{order.status}</span>
                        <span>{formatNaira(order.total)}</span>
                      </div>
                      <small>{itemCount} item{itemCount === 1 ? "" : "s"}</small>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
