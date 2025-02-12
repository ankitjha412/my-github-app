import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecentCommits, fetchContributions } from "../services/githubService";
import "./commitdetails.css";

const CommitDetails = () => {
  const { owner, repo } = useParams(); // ✅ Get repo details from URL
  const token = localStorage.getItem("github_token");
  const [commits, setCommits] = useState([]);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (token) {
      fetchRecentCommits(token, owner, repo).then(setCommits);
      fetchContributions(token, owner).then(setContributions);
    }
  }, [token, owner, repo]);

  return (
    <div className="commitmainbox">
          <button onClick={() => window.history.back()}>🔙 Go Back</button>

      <div className="commit-details">
      <h2>Commit Details for {repo}</h2>

      <h3>Commits:</h3>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            {commit.commit.message} - <strong>{commit.author?.login}</strong>
          </li>
        ))}
      </ul>

      <h3>fetchRecentCommits:</h3>
      <ul>
        {contributions.map((event, index) => (
          <li key={index}>
            {event.type === "PushEvent" && (
              <>
                <strong>Pushed</strong> {event.payload.commits.length} commit(s) to{" "}
                <strong>{event.repo.name}</strong>
              </>
            )}
            {event.type === "PullRequestEvent" && (
              <>
                <strong>Opened a pull request</strong> in <strong>{event.repo.name}</strong>
              </>
            )}
          </li>
        ))}
      </ul>

    </div>

    </div>
    
  );
};

export default CommitDetails;
