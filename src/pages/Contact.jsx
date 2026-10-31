import { useState } from "react";
import * as api from "../lib/api.js";
import { SITE, whatsappLink } from "../config/site.js";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Order question", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api.submitContactForm(form);
      setStatus("sent");
      setForm({ name: "", email: "", topic: "Order question", message: "" });
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <div className="section contact-page">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h1>Questions about your skin or your order?</h1>
          <p>
            Send us a message and we will reply by email. For an existing order, please include your order number.
          </p>

          <div className="contact-info">
            {SITE.contactEmail && (
              <div>
                <h4>Email</h4>
                <p><a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></p>
              </div>
            )}
            {SITE.whatsapp && (
              <div>
                <h4>WhatsApp</h4>
                <p><a href={whatsappLink()} target="_blank" rel="noreferrer">Chat with us</a></p>
              </div>
            )}
            {SITE.contactPhone && (
              <div>
                <h4>Phone</h4>
                <p>{SITE.contactPhone}</p>
              </div>
            )}
            {SITE.location && (
              <div>
                <h4>Based in</h4>
                <p>{SITE.location}</p>
              </div>
            )}
          </div>
        </div>

        <form className="auth-card contact-form" onSubmit={handleSubmit}>
          {error && <div className="success-banner" style={{ background: "var(--coral)" }}>{error}</div>}
          {status === "sent" && (
            <div className="success-banner">Message sent. We'll get back to you by email.</div>
          )}
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required maxLength={80} value={form.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic" value={form.topic} onChange={handleChange}>
              <option>Order question</option>
              <option>Product recommendation</option>
              <option>Wholesale / partnership</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required maxLength={4000} value={form.message} onChange={handleChange} />
          </div>
          <button className="btn btn-coral" type="submit" disabled={status === "sending"} style={{ width: "100%" }}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
