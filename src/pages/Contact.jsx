import { useState } from "react";
import * as api from "../lib/api.js";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Order question", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    await api.submitContactForm(form);
    setStatus("sent");
    setForm({ name: "", email: "", topic: "Order question", message: "" });
  }

  return (
    <div className="section contact-page">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h1>Questions about your skin or your order?</h1>
          <p>
            Our team replies within one business day. For fastest support on an existing order,
            include your order number.
          </p>

          <div className="contact-info">
            <div>
              <h4>Email</h4>
              <p>hello@skinbywura.com</p>
            </div>
            <div>
              <h4>WhatsApp</h4>
              <p>+234 800 000 0000</p>
            </div>
            <div>
              <h4>Studio</h4>
              <p>Lekki Phase 1, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <form className="auth-card contact-form" onSubmit={handleSubmit}>
          {status === "sent" && (
            <div className="success-banner">Message sent — we'll get back to you soon.</div>
          )}
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required value={form.name} onChange={handleChange} />
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
            <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange} />
          </div>
          <button className="btn btn-coral" type="submit" disabled={status === "sending"} style={{ width: "100%" }}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
