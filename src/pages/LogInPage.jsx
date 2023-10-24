import React, { useState } from "react";
import { Link } from "react-router-dom";

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //stores the canges of status in the selected field
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault(); //API request

    const handleLogin = () => {
      setIsLoggedIn(true); //if the credentials are good the login is true
    };

    return (
      <>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>

        <div>
          {isLoggedIn ? (
            <div>
              <Link to="/games/:id/comments"></Link>
            </div>
          ) : (
            <div>
              <p>Login:</p>
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default LogInPage;
