import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecentCommits, fetchContributions } from "../services/githubService";

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
    <div>
      <h2>Commit Details for {repo}</h2>

      <h3>Recent Commits:</h3>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            {commit.commit.message} - {commit.author?.login}
          </li>
        ))}
      </ul>

      <h3>Contributions:</h3>
      <ul>
        {contributions.map((event, index) => (
          <li key={index}>
            {event.type === "PushEvent" && `Pushed ${event.payload.commits.length} commit(s) to ${event.repo.name}`}
            {event.type === "PullRequestEvent" && `Opened a pull request in ${event.repo.name}`}
          </li>
        ))}
      </ul>

      <button onClick={() => window.history.back()}>🔙 Go Back</button>
    </div>
  );
};

export default CommitDetails;
