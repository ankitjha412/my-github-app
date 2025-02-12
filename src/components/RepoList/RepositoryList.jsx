import { useNavigate } from "react-router-dom";
import './Repolist.css';

const RepositoryList = ({ repos }) => {
  const navigate = useNavigate();

  const handleViewCommits = (owner, repo) => {
    navigate(`/commits/${owner}/${repo}`); // ✅ Navigate to commits page
  };

  const handleViewReadme = (owner, repo) => {
    navigate(`/readme/${owner}/${repo}`); // ✅ Navigate to README page
  };

  return (
    <div className="repository-container">
      <h3>Your Repositories:</h3>
      <ul className="repository-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-card">
            <p className="repo-name">{repo.name}</p>
            <div className="repo-buttons">
              <button onClick={() => handleViewCommits(repo.owner.login, repo.name)}>
                View Commits
              </button>
              <button onClick={() => handleViewReadme(repo.owner.login, repo.name)}>
                View README
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
