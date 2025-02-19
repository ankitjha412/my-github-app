import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

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
    <div className="authmaincontainer">
      <div className="auth-container">
      <h2>GitHub OAuth Authentication</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
    </div>
    
  );
};

export default Auth;
