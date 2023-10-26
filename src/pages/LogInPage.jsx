import React, { useState } from "react";
import axios from "axios";
import "./LogInPage.css";
import { useNavigate } from "react-router-dom";

function LogInPage({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const url = "https://gameapp-g.adaptable.app/users";

  const fetchUsersData = () => {
    axios
      .get(`${url}?password=${password}&userName=${username}`)
      .then((response) => {
        const userData = response.data[0];
        if (userData) {
          setIsLoggedIn(true);
          startRedirectTimer();
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          setUserNotFound(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchUsersData();
  };

  const startRedirectTimer = () => {
    console.log("test");
    setTimeout(() => {
      console.log("setTimeout");
      navigate(-1);
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleLogin}>
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

        <button>Login</button>
      </form>
      {userNotFound && <p>User not found!</p>}
      <div>
        {isLoggedIn ? (
          <div>
            <p>Login complete, redirecting!</p>
          </div>
        ) : (
          <div>
            <p>Login:</p>
          </div>
        )}
      </div>
    </>
  );
}

export default LogInPage;
