import React, { useState } from "react";
import { Link } from "react-router-dom";

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    if (username === "username" && password === "password") {
      //mettere al posto di "user e pass" le variabili di "altrove"
      setIsLoggedIn(true);
      //dove va sta roba? Ai posteri l'ardua sentenza!
    }
  };

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
