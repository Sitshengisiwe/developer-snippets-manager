import { Link, useParams } from "react-router-dom";
import { loadSnippets } from "../utils/localStorage";

export default function ViewSnippet() {
  const { id } = useParams();
  const snippet = loadSnippets().find((s) => s.id === id);

  if (!snippet) {
    return (
      <div style={{ padding: 20 }}>
        <p>Snippet not found.</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  async function copy() {
    await navigator.clipboard.writeText(snippet.code);
    alert("Copied!");
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{snippet.title}</h2>
        <Link to="/">Back</Link>
      </header>

      <p style={{ opacity: 0.8 }}>{snippet.language}</p>

      <div style={{ display: "flex", gap: 10, margin: "12px 0" }}>
        <Link to={`/edit/${snippet.id}`}>Edit</Link>
        <button onClick={copy}>Copy code</button>
      </div>

      <pre
        style={{
          background: "#000000",
          padding: 12,
          borderRadius: 10,
          overflowX: "auto",
        }}
      >
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
