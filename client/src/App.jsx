import { useState } from "react";
import axios from "axios";

const API = "https://url-shortener-backend-pme4.onrender.com";

function App() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [urls, setUrls] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Shorten URL
  const handleSubmit = async () => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL (include http/https)");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/shorten`, {
        originalUrl: url,
        customAlias: customAlias
      });

      setShortUrl(res.data.shortUrl);
      setUrl("");
      setCustomAlias("");
      setShowDashboard(false);

    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Copy Short URL
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  // 🔹 Fetch Analytics
  const fetchUrls = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/all`);
      setUrls(res.data);
      setShowDashboard(true);
      setSearchTerm("");

    } catch (error) {
      console.error(error);
      alert("Error fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete URL
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);
      setUrls(urls.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting URL");
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Shortener</h1>

      {/* URL Input */}
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "320px", padding: "10px" }}
      />

      <br /><br />

      {/* Custom Alias */}
      <input
        type="text"
        placeholder="Custom alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        style={{ width: "320px", padding: "10px" }}
      />

      <br /><br />

      {/* Buttons */}
      <div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Shorten"}
        </button>

        <button
          onClick={fetchUrls}
          style={{ marginLeft: "10px" }}
        >
          View Analytics
        </button>
      </div>

      {/* Short URL Result */}
      {shortUrl && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            backgroundColor: "#e6f0ff",
            borderRadius: "8px",
            display: "inline-block"
          }}
        >
          <strong>Shortened URL:</strong>

          <br /><br />

          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: "bold" }}
          >
            {shortUrl}
          </a>

          <br /><br />

          <button onClick={handleCopy}>Copy</button>
        </div>
      )}

      {/* Dashboard */}
      {showDashboard && (
        <div style={{ marginTop: "50px" }}>
          <h2>Analytics Dashboard</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by URL or short code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              width: "300px",
              marginBottom: "20px"
            }}
          />

          <table border="1" style={{ margin: "0 auto", width: "80%" }}>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short Code</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {urls
                .filter((item) =>
                  item.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <tr key={item._id}>
                    <td style={{ maxWidth: "350px", wordBreak: "break-word" }}>
                      {item.originalUrl}
                    </td>

                    <td>
                      <a
                        href={`${API}/${item.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.shortCode}
                      </a>
                    </td>

                    <td>{item.clicks}</td>

                    <td>
                      {new Date(item.createdAt).toLocaleString()}
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;