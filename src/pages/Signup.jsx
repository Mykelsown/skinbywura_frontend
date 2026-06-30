import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Auth.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || form.password.length < 6) {
      setError("Fill every field — passwords need at least 6 characters.");
      return;
    }
    setLoading(true);
    await signup(form);
    setLoading(false);
    navigate("/profile");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-sub">Join the glow club for faster checkout and order history.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="success-banner" style={{ background: "var(--coral)" }}>{error}</div>}
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={form.name} onChange={update("name")} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={update("email")} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={update("password")} />
          </div>
          <button className="btn btn-coral" type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="auth-foot">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
