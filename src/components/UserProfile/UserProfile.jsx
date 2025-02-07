import React from "react";

const UserProfile = ({ user }) => {
  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <div>
      <img src={user.avatar_url} alt="Profile" style={{ width: 100, borderRadius: "50%" }} />
      <h3>{user.name || user.login}</h3>
      <p>@{user.login}</p>
      {user.bio ? <p><strong>Bio:</strong> {user.bio}</p> : <p>No bio available</p>}

    </div>
  );
};

export default UserProfile;
