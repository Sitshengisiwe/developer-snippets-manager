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
