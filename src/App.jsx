import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddSnippet from "./pages/AddSnippet";
import EditSnippet from "./pages/EditSnippet";
import ViewSnippet from "./pages/ViewSnippet";
export default function App() {
  return (
    <div
      className="container"
      //style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}
    >
      <Navbar />

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Main app pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddSnippet />} />
        <Route path="/edit/:id" element={<EditSnippet />} />
        <Route path="/snippet/:id" element={<ViewSnippet />} />
      </Routes>
    </div>
  );
}
