import { useEffect, useMemo, useState } from "react";

export default function SnippetForm({ initialValues, onSubmit, submitLabel }) {
  // Form state values (no tags)
  const [values, setValues] = useState(() => ({
    title: initialValues?.title || "",
    language: initialValues?.language || "",
    code: initialValues?.code || "",
  }));

  // Controls the popup message
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  function triggerPopup(message) {
    setPopupText(message);
    setShowPopup(true);

    // Hide after 5 seconds
    setTimeout(() => setShowPopup(false), 5000);
  }

  // Validate form fields
  const errors = useMemo(() => {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.language.trim()) e.language = "Language is required";
    if (!values.code.trim()) e.code = "Code is required";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  // Update state when typing
  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  // Submit form
  function handleSubmit(e) {
    e.preventDefault();
    // If invalid, show popup + stop
    if (!isValid) {
      triggerPopup("Please fill in all required fields.");
      return;
    }

    // Send clean data back to parent page
    onSubmit({
      title: values.title.trim(),
      language: values.language.trim(),
      code: values.code,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      {showPopup && (
        <div
          className="card"
          style={{
            borderColor: "rgba(239,68,68,.35)",
            background: "rgba(239,68,68,.10)",
            maxWidth: "100%",
          }}
        >
          <strong style={{ fontSize: 14 }}>⚠️ {popupText}</strong>
        </div>
      )}

      {/* Title */}
      <div style={{ display: "grid", gap: 6 }}>
        <label className="muted">Title</label>
        <input
          className="input"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="e.g. Merge two dictionaries"
        />
        {errors.title && (
          <small style={{ color: "#ef4444" }}>{errors.title}</small>
        )}
      </div>

      {/* Language */}
      <div style={{ display: "grid", gap: 6 }}>
        <label className="muted">Language</label>
        <input
          className="input"
          name="language"
          value={values.language}
          onChange={handleChange}
          placeholder="e.g. Python"
        />
        {errors.language && (
          <small style={{ color: "#ef4444" }}>{errors.language}</small>
        )}
      </div>

      {/* Code */}
      <div style={{ display: "grid", gap: 6 }}>
        <label className="muted">Code</label>
        <textarea
          className="input"
          name="code"
          value={values.code}
          onChange={handleChange}
          rows={10}
          placeholder="Paste your snippet here..."
        />
        {errors.code && (
          <small style={{ color: "#ef4444" }}>{errors.code}</small>
        )}
      </div>

      {/* Buttons row */}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btnPrimary" type="submit">
          {submitLabel || "Save"}
        </button>
      </div>
    </form>
  );
}
