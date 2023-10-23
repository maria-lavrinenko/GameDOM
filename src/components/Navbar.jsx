import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://rawg.io/api/games/?search=${searchQuery}&key=f5a6ee95c2244cf89898fde4d42ba530`
        )
        .then((response) => {
          setSearchResults(response.data);
          console.log(searchResults);
        })
        .catch((error) => console.error(error));
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery) {
      if (onSearch) {
        if (searchTimeout) {
          clearTimeout(searchTimeout);
        }

        const timeoutId = setTimeout(() => {
          onSearch(searchQuery);
        }, 1000);

        setSearchTimeout(timeoutId);
      }
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
    </div>
  );
}

export default Navbar;
