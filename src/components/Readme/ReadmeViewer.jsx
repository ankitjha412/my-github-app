import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReadme, fetchUserProfile } from "../../services/githubService"; // ✅ Fetch user profile
import './ReadmeViewer.css'
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
    <div className="readme">
      <div className="readme-container">
      <h2>README for {repo}</h2>
      <pre>{readme}</pre>
      <button onClick={() => window.history.back()}>🔙 Go Back</button>
    </div>
    </div>
    
  );
};

export default ReadmeViewer;
