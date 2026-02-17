// Search input component
/*export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search snippets..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: 10,
        marginTop: 12,
        borderRadius: 8,
        border: "1px solid #ccc",
      }}
    />
  );
}*/

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="input"
      type="text"
      placeholder="Search snippets..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
