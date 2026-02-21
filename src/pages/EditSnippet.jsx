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

    // After update go back to dashboard
    navigate("/dashboard");
  }

  // If snippet not found
  if (!snippet) {
    return (
      <div className="card">
        <h2 className="h2">Snippet not found</h2>
        <Link className="btn" to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <header className="pageHeader">
        <h2 className="h2">Edit Snippet</h2>

        {/* Proper back button */}
        <Link className="btn" to="/dashboard">
          ← Back
        </Link>
      </header>

      {/* Form wrapped in card for consistency */}
      <div className="card">
        <SnippetForm
          initialValues={snippet}
          onSubmit={handleUpdate}
          submitLabel="Update Snippet"
        />
      </div>
    </div>
  );
}
