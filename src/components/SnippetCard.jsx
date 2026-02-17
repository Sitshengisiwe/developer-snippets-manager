import { Link } from "react-router-dom";
import { useState } from "react";

export default function SnippetCard({ snippet, onDelete }) {
  // Controls the "Copied ✅" message
  const [copied, setCopied] = useState(false);

  // Copy snippet code
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);

      // Hide message after short time
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }

  return (
    <div className="card">
      {/* Top row: title + language + actions */}
      <div className="cardTop">
        <div>
          <h3 className="cardTitle">{snippet.title}</h3>
          <div className="muted">{snippet.language}</div>
        </div>

        {/* Buttons */}
        <div className="actions">
          <button className="btn" onClick={handleCopy}>
            Copy
          </button>

          {copied && (
            <span className="muted" style={{ alignSelf: "center" }}>
              Copied ✅
            </span>
          )}

          {/* Links styled as buttons */}
          <Link className="btn" to={`/snippet/${snippet.id}`}>
            View
          </Link>

          <Link className="btn" to={`/edit/${snippet.id}`}>
            Edit
          </Link>

          <button
            className="btn btnDanger"
            onClick={() => onDelete(snippet.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Code block */}
      <pre className="code">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
