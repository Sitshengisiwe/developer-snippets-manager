import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SnippetForm from "../components/SnippetForm";
import { loadSnippets, saveSnippets } from "../utils/localStorage";

export default function EditSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const snippets = useMemo(() => loadSnippets(), []);
  const snippet = snippets.find((s) => s.id === id);

  function handleUpdate(data) {
    const now = Date.now();
    const next = snippets.map((s) =>
      s.id === id ? { ...s, ...data, updatedAt: now } : s,
    );
    saveSnippets(next);
    navigate("/");
  }

  if (!snippet) {
    return (
      <div style={{ padding: 20 }}>
        <p>Snippet not found.</p>
        <Link to="/">Back</Link>
      </div>
    );
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
        <h2>Edit Snippet</h2>
        <Link to="/">dashboard</Link>
      </header>

      <SnippetForm
        initialValues={snippet}
        onSubmit={handleUpdate}
        submitLabel="Update Snippet"
      />
    </div>
  );
}
