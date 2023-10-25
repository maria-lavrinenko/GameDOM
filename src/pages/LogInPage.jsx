import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [redirectTimer, setRedirectTimer] = useState(null);
  const navigate = useNavigate();
  const url = "https://gameapp-g.adaptable.app/users";

  const fetchUsersData = () => {
    axios
      .get(url)
      .then((response) => {
        const userData = response.data;
        const user = userData.find((user) => user.userName === username);
        if (user && user.password === password) {
          setIsLoggedIn(true);
          startRedirectTimer();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = () => {
    fetchUsersData();
  };

  const startRedirectTimer = () => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 3000);
    setRedirectTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [redirectTimer]);

  return (
    <>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      <div>
        {isLoggedIn ? (
          <div>
            <p>Redirecting to the previous page...</p>
          </div>
        ) : (
          <div>
            <p>Please Login</p>
          </div>
        )}
      </div>
    </>
  );
}

export default LogInPage;
