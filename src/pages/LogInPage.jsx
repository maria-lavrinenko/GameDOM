import React, { useState } from "react";
import axios from "axios";
import "./LogInPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/Modal";

function LogInPage({
  isLoggedIn,
  setIsLoggedIn,
  isOpen,
  setIsOpen,
  outline,
  setOutline,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const url = "https://gameapp-g.adaptable.app/users";
  const { state } = useLocation();
  const [message, setMessage] = useState("");

  const iscomingFromSignUp = state && state.fromSignUp;

  const fetchUsersData = () => {
    axios
      .get(`${url}?password=${password}&userName=${username}`)
      .then((response) => {
        const userData = response.data[0];
        if (userData) {
          setIsLoggedIn(true);
          setMessage("Login complete, redirecting!");
          startRedirectTimer();
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          setUserNotFound(true);
          setMessage("User not found!");
          setTimeout(() => {
            setMessage("");
            setUsername("");
            setPassword("");
            setIsOpen(true);
          }, 1000);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchUsersData();
  };

  const startRedirectTimer = () => {
    if (iscomingFromSignUp) {
      setTimeout(() => {
        navigate(-2);
      }, 2000);
    } else {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <fieldset className="login-border">
              <legend className="login-legend">
                Who are you, unknown gamer?
              </legend>
              <div className="login-request-container">
                <label className="login-label" htmlFor="username">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                />

                <label className="login-label" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <button>Login</button>
              </div>

              <div className="login-response-container">
                {isLoggedIn ? (
                  <h2 className="login-response success">{message}</h2>
                ) : userNotFound ? (
                  <div>
                    <h2 className="login-response error">{message}</h2>
                    {isOpen && (
                      <Modal
                        setIsOpen={setIsOpen}
                        setOutline={setOutline}
                        outline={outline}
                      />
                    )}
                  </div>
                ) : null}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
