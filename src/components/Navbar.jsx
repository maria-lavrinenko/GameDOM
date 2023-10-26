import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import logo from "../assets/logo-big.png";
import Logout from "../components/Logout";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";

function Navbar({ onSearch, isLoggedIn, setIsLoggedIn, isOpen, setIsOpen }) {
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/?q=" + searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const location = useLocation();
  if (location.pathname === "/*") {
    return null;
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="GameDOM logo" />
        </Link>
      </div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <div>
            <Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <button onClick={openModal}>Sign up</button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
