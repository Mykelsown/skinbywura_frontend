import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section empty-state">
      <h3>This page wandered off</h3>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-coral" style={{ marginTop: 20, display: "inline-flex" }}>
        Back home
      </Link>
    </div>
  );
}
