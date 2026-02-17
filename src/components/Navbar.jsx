import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      {/* Brand */}
      <div className="brand">
        <span className="brandDot" />
        <span className="brandText">Developer Snippets Manager</span>
      </div>

      {/* Navigation */}
      <div className="navActions">
        <NavLink to="/" className="btn">
          Home
        </NavLink>

        <NavLink to="/dashboard" className="btn">
          Dashboard
        </NavLink>

        <NavLink to="/add" className="btn btnPrimary">
          Add Snippet
        </NavLink>
      </div>
    </div>
  );
}
