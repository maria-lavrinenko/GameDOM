import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import logo from "../assets/logo-big.png";
import Logout from "../components/Logout";

function Navbar({ onSearch, isLoggedIn, setIsLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState("");

  // const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/?q=" + searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
            <Link to="/sign-up">
              <button>Sign up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
