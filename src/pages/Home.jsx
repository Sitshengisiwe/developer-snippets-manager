import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "grid", gap: 16, paddingTop: 10 }}>
      <h1 className="h1">Stop losing your code snippets.</h1>

      <p className="muted" style={{ fontSize: 16, maxWidth: 720 }}>
        Developer Snippets Manager is a simple tool that helps you save, search,
        edit, and organize reusable code snippets in one place — stored locally
        in your browser.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/dashboard" className="btn btnPrimary">
          Go to Dashboard
        </Link>
        <Link to="/add" className="btn">
          Add your first snippet
        </Link>
      </div>

      <div className="card" style={{ maxWidth: 820 }}>
        <h2 className="h2">What you can do</h2>
        <ul
          className="muted"
          style={{ marginTop: 10, display: "grid", gap: 8 }}
        >
          <li>Create snippets (title, language, code)</li>
          <li>Search snippets instantly</li>
          <li>Filter by language</li>
          <li>Edit, delete, and copy code</li>
          <li>Snippets stay saved using localStorage</li>
        </ul>
      </div>
    </div>
  );
}
