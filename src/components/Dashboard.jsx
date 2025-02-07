import { useEffect, useState } from "react";
import { fetchUserProfile, fetchRepositories } from "../services/githubService";
import UserProfile from "./UserProfile";
import RepositoryList from "./RepositoryList";
import GitHubHeatmap from "./GitHubHeatmap";
import UserSearch from "./UserSearch";

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
    <div>
      <h2>GitHub Dashboard</h2>

      {/* ✅ User Profile Section */}
      <UserProfile user={user} />

      {/* ✅ Search GitHub Users */}
      <UserSearch />
      {/* ✅ Repositories Section */}
      <RepositoryList repos={repos} />
      {user && <GitHubHeatmap username={user.login} />}

    </div>
  );
};

export default Dashboard;
