import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeDocument = async () => {
    if (!file) {
      alert("Please choose a file.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Smart Document Analyzer</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={analyzeDocument}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <pre
        style={{
          marginTop: 20,
          background: "#eee",
          padding: 20,
          whiteSpace: "pre-wrap",
        }}
      >
        {result}
      </pre>
    </div>
  );
}
