import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReadme, fetchUserProfile } from "../../services/githubService"; // ✅ Fetch user profile
import GitHubHeatmap from "../Githubheatmap/GitHubHeatmap";

const ReadmeViewer = () => {
  const { owner, repo } = useParams(); // ✅ Get repo details from URL
  const token = localStorage.getItem("github_token");
  const [readme, setReadme] = useState("Loading README...");
  const [username, setUsername] = useState(null); // ✅ Store username for heatmap

  useEffect(() => {
    if (token) {
      fetchReadme(token, owner, repo).then(setReadme);
      fetchUserProfile(token).then((userData) => setUsername(userData.login)); // ✅ Fetch username
    }
  }, [token, owner, repo]);

  return (
    <div>
      <h2>README for {repo}</h2>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{readme}</pre>
      <button onClick={() => window.history.back()}>🔙 Go Back</button>

      {/* ✅ Only render Heatmap if username is available */}
    </div>
  );
};

export default ReadmeViewer;
