import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Page not found.</p>
      <Link to="/" className="not-found-link">
        Return to home
      </Link>
    </div>
  );
}