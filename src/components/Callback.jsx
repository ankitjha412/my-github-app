import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGitHubToken } from "../services/githubService.js";

const Callback = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      getGitHubToken(code).then((accessToken) => {
        setToken(accessToken);
        localStorage.setItem("github_token", accessToken);
        navigate("/dashboard");
      });
    }
  }, []);

  return <h2>Authenticating...</h2>;
};

export default Callback;
