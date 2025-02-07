import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSearchedUserProfile, fetchUserRepositories } from "../services/githubService";
import SearchedUserProfile from "../components/SearchedUserProfile";
import RepositoryList from "../components/RepositoryList";

const SearchPageDetails = () => {
  const { username } = useParams(); // ✅ Get the searched username from the URL
  const token = localStorage.getItem("github_token");
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchedRepos, setSearchedRepos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (token && username) {
      fetchSearchedUserProfile(token, username).then(setSearchedUser);
      fetchUserRepositories(token, username).then(setSearchedRepos);
    }
  }, [token, username]);

  return (
    <div>
            <button onClick={() => navigate(-1)}>🔙 Go Back</button>

      <h2>GitHub User Details for {username}</h2>

      {/* ✅ Display Searched User Profile */}
      {searchedUser && <SearchedUserProfile user={searchedUser} />}

      {/* ✅ Display Searched User's Repositories */}
      <h3>Repositories:</h3>
      <RepositoryList repos={searchedRepos} />
    </div>
  );
};

export default SearchPageDetails;
