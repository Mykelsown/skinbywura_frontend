import { useMemo, useState } from "react";
import reviewData from "../data/reviews.js";
import "./Reviews.css";

export default function Reviews() {
  const [filter, setFilter] = useState(0);

  const avg = useMemo(
    () => (reviewData.reduce((s, r) => s + r.rating, 0) / reviewData.length).toFixed(1),
    []
  );

  const counts = useMemo(() => {
    const c = [0, 0, 0, 0, 0];
    reviewData.forEach((r) => (c[r.rating - 1] += 1));
    return c;
  }, []);

  const filtered = filter === 0 ? reviewData : reviewData.filter((r) => r.rating === filter);

  return (
    <div className="section reviews-page">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Real customers, real glow</span>
          <h2>Reviews</h2>
        </div>

        <div className="reviews-summary">
          <div className="reviews-score">
            <span className="score-number">{avg}</span>
            <div className="stars score-stars">{"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}</div>
            <p>{reviewData.length} verified reviews</p>
          </div>
          <div className="reviews-bars">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = counts[star - 1];
              const pct = Math.round((count / reviewData.length) * 100);
              return (
                <button
                  key={star}
                  className={filter === star ? "rating-bar-row active" : "rating-bar-row"}
                  onClick={() => setFilter(filter === star ? 0 : star)}
                >
                  <span>{star}★</span>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="bar-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="reviews-list">
          {filtered.map((r) => (
            <div className="review-card" key={r.id}>
              <div className="review-card-head">
                <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                {r.verified && <span className="verified-tag">Verified buyer</span>}
              </div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <div className="review-card-foot">
                <span>{r.name} · {r.location}</span>
                <span>{r.productName}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <h3>No reviews at that rating yet</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
