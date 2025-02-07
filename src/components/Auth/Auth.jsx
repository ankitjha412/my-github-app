import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const authURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
    window.location.href = authURL;
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      navigate(`/callback?code=${code}`);
    }
  }, []);

  return (
    <div>
      <h2>GitHub OAuth Authentication</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default Auth;
