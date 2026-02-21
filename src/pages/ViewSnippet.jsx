import { Link, useParams } from "react-router-dom";
import { loadSnippets } from "../utils/localStorage";

export default function ViewSnippet() {
  const { id } = useParams();
  const snippet = loadSnippets().find((s) => s.id === id);

  // If snippet doesn't exist (wrong id / deleted), show message
  if (!snippet) {
    return (
      <div className="card">
        <h2 className="h2">Snippet not found</h2>
        <p className="muted">
          It may have been deleted or the link is incorrect.
        </p>
        <Link className="btn" to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet.code);
      // If you prefer no alerts, we can change this to "Copied ✅" text like on cards
      alert("Copied!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }

  return (
    <div>
      {/* Page header */}
      <header className="pageHeader">
        <div>
          <h2 className="h2">{snippet.title}</h2>
          {/* ✅ language restored */}
          <p className="muted" style={{ marginTop: 6 }}>
            {snippet.language}
          </p>
        </div>

        <Link className="btn" to="/dashboard">
          Back
        </Link>
      </header>

      {/* Content card */}
      <div className="card">
        <div className="actions" style={{ justifyContent: "flex-end" }}>
          <Link className="btn" to={`/edit/${snippet.id}`}>
            Edit
          </Link>

          <button className="btn btnPrimary" onClick={copy}>
            Copy code
          </button>
        </div>

        <pre className="code">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}
