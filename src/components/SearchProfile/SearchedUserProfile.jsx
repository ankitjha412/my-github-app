import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GitHubHeatmap from "../Githubheatmap/GitHubHeatmap";
import {
  followUser,
  unfollowUser,
  checkFollowStatus,
} from "../../services/githubService"; // ✅ Import API calls

const SearchedUserProfile = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("github_token");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (token && user) {
      checkFollowStatus(token, user.login).then(setIsFollowing);
    }
  }, [token, user]);

  const handleFollow = async () => {
    if (!isFollowing) {
      await followUser(token, user.login);
    } else {
      await unfollowUser(token, user.login);
    }
    setIsFollowing(!isFollowing);
  };

  if (!user) return null;

  return (
    <div>

      <h2>Profile for {user.login}</h2>
      <img
        src={user.avatar_url}
        alt="Profile"
        style={{ width: 100, borderRadius: "50%" }}
      />
       <button onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <h3>{user.name || user.login}</h3>
      <p>@{user.login}</p>
      {user.bio ? (
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
      ) : (
        <p>No bio available</p>
      )}

      {/* ✅ GitHub Heatmap for searched user */}
      <GitHubHeatmap username={user.login} />

      {/* ✅ Follow/Unfollow Button */}
     

      {/* ✅ Go Back Button */}
    </div>
  );
};

export default SearchedUserProfile;
