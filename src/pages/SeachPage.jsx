import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSearchedUserProfile, fetchUserRepositories } from "../services/githubService";
import SearchedUserProfile from "../components/SearchProfile/SearchedUserProfile";
import RepositoryList from "../components/RepoList/RepositoryList";
import "./SearchPageDetails.css";

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
    <div className="search-page">
    <div className="gitdetails">
    <button onClick={() => navigate(-1)}>🔙 Go Back</button>

{/* ✅ Display Searched User Profile */}
{searchedUser && (
  <div className="searched-user-profile">
        <h2>GitHub User Details for {username}</h2>

    <SearchedUserProfile user={searchedUser} />
  </div>
)}
    </div>
      

      {/* ✅ Display Searched User's Repositories */}
      <div className="repositoty">
      <h3>Repositories:</h3>
      <div className="repository-list">
        <RepositoryList repos={searchedRepos} />
      </div>
      </div>
      
    </div>
  );
};

export default SearchPageDetails;
