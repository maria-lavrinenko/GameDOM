import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LogIn.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      .get(`${url}?password=${password}&userName=${username}`)
      .then((response) => {
        const userData = response.data[0];
        if (userData) {
          setIsLoggedIn(true);
          startRedirectTimer();
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          console.log("user not found");
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

  //   useEffect(() => {
  //     return () => {
  //       if (redirectTimer) {
  //         clearTimeout(redirectTimer);
  //       }
  //     };
  //   }, [redirectTimer]);

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

      <div>
        {isLoggedIn ? (
          <div>
            <p>Login done!</p>
            <Link to="/games/:id/comments">Go to comment page</Link>
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