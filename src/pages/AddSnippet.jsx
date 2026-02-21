import { useNavigate } from "react-router-dom";
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

    // Go back to dashboard after saving
    navigate("/dashboard");
  }

  return (
    <div>
      {/* Header */}
      <header className="pageHeader">
        <h2 className="h2">Add Snippet</h2>

        {/* Cancel button */}
        <button className="btn" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </header>

      {/* Form inside card */}
      <div className="card">
        <SnippetForm onSubmit={handleCreate} submitLabel="Create Snippet" />
      </div>
    </div>
  );
}
