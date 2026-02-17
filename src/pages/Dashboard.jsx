import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { loadSnippets, saveSnippets } from "../utils/localStorage";
import SnippetCard from "../components/SnippetCard";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // Load snippets when dashboard opens
  useEffect(() => {
    setSnippets(loadSnippets());
  }, []);

  // Build list of languages (unique + sorted)
  const languages = useMemo(() => {
    const set = new Set(snippets.map((s) => s.language).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [snippets]);

  // Filter by search + selected language
  const filteredSnippets = useMemo(() => {
    const q = search.trim().toLowerCase();

    return snippets.filter((s) => {
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q);

      const matchesLanguage =
        selectedLanguage === "All" || s.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [snippets, search, selectedLanguage]);

  // Delete snippet
  function handleDelete(id) {
    const ok = window.confirm("Delete this snippet?");
    if (!ok) return;

    const next = snippets.filter((s) => s.id !== id);
    setSnippets(next);
    saveSnippets(next);
  }

  return (
    <div>
      {/* Title + Add button row */}
      <header className="pageHeader">
        <h2 className="h1">Dashboard</h2>

        {/* This is now styled like a button */}
        <Link to="/add" className="btn btnPrimary">
          + Add Snippet
        </Link>
      </header>

      {/* Search + Language filter row */}
      <div className="filters">
        <div style={{ flex: 1 }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <select
          className="input"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{ maxWidth: 220 }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Snippet list */}
      {filteredSnippets.length === 0 ? (
        <p className="muted">No snippets found.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {filteredSnippets.map((s) => (
            <SnippetCard key={s.id} snippet={s} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
