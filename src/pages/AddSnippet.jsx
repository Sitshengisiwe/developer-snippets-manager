import { useNavigate, Link } from "react-router-dom";
import SnippetForm from "../components/SnippetForm";
import { loadSnippets, saveSnippets } from "../utils/localStorage";

function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}

export default function AddSnippet() {
  const navigate = useNavigate();

  function handleCreate(data) {
    const now = Date.now();
    const newSnippet = {
      id: makeId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const current = loadSnippets();
    const next = [newSnippet, ...current];

    saveSnippets(next);
    navigate("/");
  }

  return (
    <div style={{ padding: 10 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Add Snippet</h2>
        <Link to="/">dashboard</Link>
      </header>

      <SnippetForm onSubmit={handleCreate} submitLabel="Create Snippet" />
    </div>
  );
}
