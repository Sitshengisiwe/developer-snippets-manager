import { useEffect, useMemo, useState } from "react";
import { loadSnippets, saveSnippets } from "../utils/localStorage";
import SnippetCard from "../components/SnippetCard";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    setSnippets(loadSnippets());
  }, []);

  const languages = useMemo(() => {
    const set = new Set(snippets.map((s) => s.language).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [snippets]);

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

  function handleDelete(id) {
    const ok = window.confirm("Delete this snippet?");
    if (!ok) return;

    const next = snippets.filter((s) => s.id !== id);
    setSnippets(next);
    saveSnippets(next);
  }

  return (
    <div>
      {/* Title row */}
      <header className="pageHeader">
        <h1 className="h1">Dashboard</h1>
      </header>

      {/* Filters */}
      <div className="filters">
        {/* ✅ no wrapper div */}
        <SearchBar value={search} onChange={setSearch} />

        {/* ✅ no inline maxWidth */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      {filteredSnippets.length === 0 ? (
        <p className="muted">No snippets found.</p>
      ) : (
        <div className="snippetsGrid">
          {filteredSnippets.map((s) => (
            <SnippetCard key={s.id} snippet={s} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
