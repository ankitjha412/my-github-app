import React from "react";
import { useNavigate } from "react-router-dom";

const RepositoryList = ({ repos }) => {
  const navigate = useNavigate();

  const handleViewCommits = (owner, repo) => {
    navigate(`/commits/${owner}/${repo}`); // ✅ Navigate to commits page
  };
  const handleViewReadme = (owner, repo) => {
    navigate(`/readme/${owner}/${repo}`); // ✅ Navigate to README page
  };


  const handleViewPullRequests = (owner, repo) => {
    navigate(`/pulls/${owner}/${repo}`);
  };

  return (
    <div>
      <h3>Your Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - 
            <button onClick={() => handleViewCommits(repo.owner.login, repo.name)}>View Commits</button>
            <button onClick={() => handleViewReadme(repo.owner.login, repo.name)}>View README</button>


          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
