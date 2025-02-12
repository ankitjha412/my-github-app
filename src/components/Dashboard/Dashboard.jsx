import { useEffect, useState } from "react";
import { fetchUserProfile, fetchRepositories } from "../../services/githubService";
import UserProfile from "../UserProfile/UserProfile";
import RepositoryList from "../RepoList/RepositoryList";
import UserSearch from "../UserSearch";
import './Dasboard.css'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const token = localStorage.getItem("github_token");

  useEffect(() => {
    if (token) {
      fetchUserProfile(token).then(setUser);
      fetchRepositories(token).then(setRepos);
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <div className="header">
      <img
    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    alt="GitHub Logo"
    className="github-logo"
  />

        <h2>GitHub Dashboard</h2>
      <UserSearch />
      </div>
      

      {/* ✅ User Profile Section */}
      <div className="profilerepocontainer">
      <UserProfile user={user} />
      <RepositoryList repos={repos} />

      </div>
      


    </div>
  );
};

export default Dashboard;
