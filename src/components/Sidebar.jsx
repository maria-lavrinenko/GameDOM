import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [platforms, setPlatforms] = useState();
  const [genres, setGenres] = useState();
  const [stores, setStores] = useState();
  const [expandedPlatforms, setExpandedPlatforms] = useState(false);
  const [expandedGenres, setExpandedGenres] = useState(false);
  const [expandedStores, setExpandedStores] = useState(false);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/genres?key=f5a6ee95c2244cf89898fde4d42ba530"
      );

      setGenres(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/platforms?key=f5a6ee95c2244cf89898fde4d42ba530"
      );
      console.log(response);
      setPlatforms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/stores?key=f5a6ee95c2244cf89898fde4d42ba530"
      );
      console.log("stores", stores);
      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
    fetchGenres();
    fetchStores();
  }, []);

  if (!platforms || !genres || !stores) {
    return <p>"Loading";</p>;
  }

  return (
    <>
      <section className="sidebar">
        <div id="platforms">
          <h3 className="sidebar-title">Platforms</h3>

          {platforms.results.map(
            (platforme, index) =>
              (expandedPlatforms || index < 5) && (
                <Link
                  to={`?platforme=` + `${platforme.id}`}
                  key={platforme.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4 className="sidebar-subtitle">{platforme.name}</h4>
                </Link>
              )
          )}
          <button
            className="scroll-buttons"
            type="button"
            onClick={() => setExpandedPlatforms(!expandedPlatforms)}
          >
            {expandedPlatforms ? "Show Less" : "Show More"}
          </button>
        </div>

        <div id="genres">
          <h3 className="sidebar-title">Genres</h3>

          {genres.results.map(
            (genre, index) =>
              (expandedGenres || index < 5) && (
                <Link
                  to={`?genres=` + `${genre.slug}`}
                  key={genre.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4 className="sidebar-subtitle">{genre.name}</h4>
                </Link>
              )
          )}
          <button
            className="scroll-buttons"
            type="button"
            onClick={() => setExpandedGenres(!expandedGenres)}
          >
            {expandedGenres ? "Show Less" : "Show More"}
          </button>
        </div>

        <div id="stores">
          <h3 className="sidebar-title">Stores</h3>
          {stores.results.map(
            (store, index) =>
              (expandedStores || index < 5) && (
                <Link
                  to={`?stores=` + `${store.id}`}
                  key={store.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4 className="sidebar-subtitle">{store.name}</h4>
                </Link>
              )
          )}
          <button
            className="scroll-buttons"
            type="button"
            onClick={() => setExpandedStores(!expandedStores)}
          >
            {expandedStores ? "Show Less" : "Show More"}
          </button>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
