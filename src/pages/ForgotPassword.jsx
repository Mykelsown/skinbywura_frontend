import { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../lib/api.js";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api.requestPasswordReset({ email });
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Reset your password</h1>
        <p className="auth-sub">We'll send a reset link to your email.</p>

        {status === "sent" ? (
          <div className="success-banner" style={{ marginTop: 26 }}>
            If an account exists for {email}, a reset link is on its way. It expires in one hour.
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="success-banner" style={{ background: "var(--coral)" }}>{error}</div>}
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="btn btn-coral" type="submit" disabled={status === "sending"} style={{ width: "100%" }}>
              {status === "sending" ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="auth-foot">
          Remembered it? <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
