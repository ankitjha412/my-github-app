import axios from "axios";

const API_URL = import.meta.env.VITE_GITHUB_API_URL;

export const getGitHubToken = async (code) => {
  const response = await axios.post("http://localhost:5000/auth/github", { code });
  return response.data.access_token;
};

// ✅ Fetch GitHub User Profile (Name, Avatar, Username)
export const fetchUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Contains login (username), avatar_url (profile pic), name
};

// ✅ Fetch User Repositories
export const fetchRepositories = async (token) => {
  const response = await axios.get(`${API_URL}/user/repos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Fetch Recent Commits
export const fetchRecentCommits = async (token, owner, repo) => {
  const response = await axios.get(`${API_URL}/repos/${owner}/${repo}/commits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Fetch User Contributions (Push Events, PRs)
export const fetchContributions = async (token, username) => {
  const response = await axios.get(`${API_URL}/users/${username}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Filter only push events (commits) and pull request events
  return response.data.filter(
    (event) => event.type === "PushEvent" || event.type === "PullRequestEvent"
  );
};
// ✅ Fetch README File from a Repository
export const fetchReadme = async (token, owner, repo) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3.raw" },
      });
      return response.data; // Returns raw README content
    } catch (error) {
      console.error(`Error fetching README for ${repo}:`, error);
      return "README not available";
    }
  };



  // ✅ Fetch GitHub User Profile (for searched user)
export const fetchSearchedUserProfile = async (token, username) => {
    try {
      const response = await axios.get(`${API_URL}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Contains login, avatar_url, name, bio
    } catch (error) {
      console.error(`Error fetching user profile for ${username}:`, error);
      return null;
    }
  };
  
  // ✅ Fetch Repositories for a Searched User
  export const fetchUserRepositories = async (token, username) => {
    try {
      const response = await axios.get(`${API_URL}/users/${username}/repos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Returns repositories
    } catch (error) {
      console.error(`Error fetching repositories for ${username}:`, error);
      return [];
    }
  };
  
  // ✅ Fetch README for a Searched User's Repository
  export const fetchReadmeForUser = async (token, owner, repo) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3.raw" },
      });
      return response.data; // Returns README content
    } catch (error) {
      console.error(`Error fetching README for ${repo}:`, error);
      return "README not available";
    }
  };
  

  // ✅ Check if the logged-in user is following the searched user
export const checkFollowStatus = async (token, username) => {
    try {
      const response = await axios.get(`https://api.github.com/user/following/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.status === 204; // 204 means "No Content" (user is following)
    } catch (error) {
      return false; // If error occurs, assume user is not following
    }
  };
  
  // ✅ Follow a user on GitHub
  export const followUser = async (token, username) => {
    try {
      await axios.put(
        `https://api.github.com/user/following/${username}`,
        {}, // Empty body required for PUT request
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`Followed ${username}`);
    } catch (error) {
      console.error(`Error following ${username}:`, error);
    }
  };
  
  // ✅ Unfollow a user on GitHub
  export const unfollowUser = async (token, username) => {
    try {
      await axios.delete(`https://api.github.com/user/following/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Unfollowed ${username}`);
    } catch (error) {
      console.error(`Error unfollowing ${username}:`, error);
    }
  };
  

  
  