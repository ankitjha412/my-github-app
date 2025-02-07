import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      navigate(`/search/${username}`); // ✅ Navigate to the search page
    }
  };

  return (
    <div>

      <h3>Search for a GitHub User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default UserSearch;
