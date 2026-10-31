import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import * as api from "../lib/api.js";
import "./Account.css";

export default function Settings() {
  const { user, loading, refresh } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [nameState, setNameState] = useState({ type: "idle", message: "" });
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [pwState, setPwState] = useState({ type: "idle", message: "" });
  const [busy, setBusy] = useState("");

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  async function saveName(e) {
    e.preventDefault();
    setBusy("name");
    setNameState({ type: "idle", message: "" });
    try {
      await api.updateProfile({ name });
      await refresh();
      setNameState({ type: "success", message: "Name updated." });
    } catch (err) {
      setNameState({ type: "error", message: err.message });
    } finally {
      setBusy("");
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setBusy("pw");
    setPwState({ type: "idle", message: "" });
    try {
      await api.changePassword(pw);
      setPw({ currentPassword: "", newPassword: "" });
      setPwState({ type: "success", message: "Password updated. Other devices were signed out." });
    } catch (err) {
      setPwState({ type: "error", message: err.message });
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="section account-page">
      <div className="container container-narrow">
        <span className="eyebrow">Settings</span>
        <h1>Account settings</h1>

        <form className="auth-card settings-form" onSubmit={saveName}>
          <h3>Your details</h3>
          <div className="form-field">
            <label htmlFor="name">Display name</label>
            <input id="name" required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" value={user.email} disabled />
          </div>
          {nameState.message && (
            <p className={nameState.type === "success" ? "account-success" : "account-error"} role="status">
              {nameState.message}
            </p>
          )}
          <button className="btn btn-coral" type="submit" disabled={busy === "name"} style={{ width: "100%", marginTop: 10 }}>
            {busy === "name" ? "Saving..." : "Save changes"}
          </button>
        </form>

        <form className="auth-card settings-form" onSubmit={savePassword} style={{ marginTop: 24 }}>
          <h3>Change password</h3>
          <div className="form-field">
            <label htmlFor="current-password">Current password</label>
            <input
              id="current-password"
              type="password"
              required
              autoComplete="current-password"
              value={pw.currentPassword}
              onChange={(e) => setPw((p) => ({ ...p, currentPassword: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="new-password">New password (8 to 72 characters)</label>
            <input
              id="new-password"
              type="password"
              required
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
              value={pw.newPassword}
              onChange={(e) => setPw((p) => ({ ...p, newPassword: e.target.value }))}
            />
          </div>
          {pwState.message && (
            <p className={pwState.type === "success" ? "account-success" : "account-error"} role="status">
              {pwState.message}
            </p>
          )}
          <button className="btn btn-outline" type="submit" disabled={busy === "pw"} style={{ width: "100%", marginTop: 10 }}>
            {busy === "pw" ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
