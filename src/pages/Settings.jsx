import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Account.css";

export default function Settings() {
  const { user, loading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [saved, setSaved] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="section account-page">
      <div className="container container-narrow">
        <span className="eyebrow">Settings</span>
        <h1>Account settings</h1>

        <form className="auth-card settings-form" onSubmit={handleSubmit}>
          {saved && <div className="success-banner">Settings saved.</div>}
          <div className="form-field">
            <label htmlFor="name">Display name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" value={user.email} disabled />
          </div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(e) => setEmailUpdates(e.target.checked)}
            />
            Send me restock alerts and new drop emails
          </label>
          <button className="btn btn-coral" type="submit" style={{ width: "100%", marginTop: 10 }}>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
