import React from "react";
import './Userprofile.css';
import GitHubHeatmap from "../Githubheatmap/GitHubHeatmap";

const UserProfile = ({ user }) => {
  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="UserProfile">
      {/* User Profile Card */}
      <div className="user-profile">
        <img src={user.avatar_url} alt="Profile" />
        <div className="user-profile-info">
          <h3>{user.name || user.login}</h3>
          <p>@{user.login}</p>
          {user.bio ? <p className="bio">{user.bio}</p> : <p className="bio">No bio available</p>}
        </div>
        <div className="user-stats-profile-container">
          <div className="user-stats">
            <div className="stat">
              <p>Repositories</p>
              <strong>{user.public_repos}</strong>
            </div>
            <div className="stat">
              <p>Followers</p>
              <strong>{user.followers}</strong>
            </div>
            <div className="stat">
              <p>Following</p>
              <strong>{user.following}</strong>
            </div>
          </div>
          <div className="profile-button-container">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-button"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>
      {user && <GitHubHeatmap username={user.login} />}
    </div>
  );
};

export default UserProfile;
