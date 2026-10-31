import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as api from "../lib/api.js";
import "./Auth.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    setStatus("saving");
    try {
      await api.resetPassword({ token, newPassword: password });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Choose a new password</h1>

        {!token ? (
          <>
            <p className="auth-sub">This link is missing its token. Please request a new reset email.</p>
            <p className="auth-foot"><Link to="/forgot-password">Request a new link</Link></p>
          </>
        ) : status === "done" ? (
          <>
            <div className="success-banner" style={{ marginTop: 26 }}>Password updated. You can sign in now.</div>
            <p className="auth-foot"><Link to="/login">Go to sign in</Link></p>
          </>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="success-banner" style={{ background: "var(--coral)" }}>{error}</div>}
            <div className="form-field">
              <label htmlFor="password">New password (8 to 72 characters)</label>
              <input id="password" type="password" required minLength={8} maxLength={72} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="confirm">Confirm new password</label>
              <input id="confirm" type="password" required minLength={8} maxLength={72} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <button className="btn btn-coral" type="submit" disabled={status === "saving"} style={{ width: "100%" }}>
              {status === "saving" ? "Saving..." : "Update password"}
            </button>
            <p className="auth-foot"><Link to="/forgot-password">Link expired? Request a new one</Link></p>
          </form>
        )}
      </div>
    </div>
  );
}
