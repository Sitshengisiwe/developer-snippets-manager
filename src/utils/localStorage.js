// Key name used to store snippets in browser storage
const KEY = "dev_snippets_v1";

// Load snippets from browser localStorage
export function loadSnippets() {
  try {
    // Get saved data
    const raw = localStorage.getItem(KEY);

    // Convert string back to array
    return raw ? JSON.parse(raw) : [];
  } catch {
    // If something goes wrong, return empty list
    return [];
  }
}

// Save snippets into localStorage
export function saveSnippets(snippets) {
  // Convert array to string before storing
  localStorage.setItem(KEY, JSON.stringify(snippets));
}
