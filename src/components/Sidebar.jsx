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
      <section id="sidebar">
        <div id="platforms">
          <h3>Platforms</h3>

          {platforms.results.map(
            (platforme, index) =>
              (expandedPlatforms || index < 3) && (
                <Link to={`?platforme=` + `${platforme.id}`} key={platforme.id}>
                  <h4>{platforme.name}</h4>
                </Link>
              )
          )}
          <button
            id="scroll-btn"
            type="button"
            onClick={() => setExpandedPlatforms(!expandedPlatforms)}
          >
            {expandedPlatforms ? "Show Less" : "Show More"}
          </button>
        </div>

        <div id="genres">
          <h3>Genres</h3>

          {genres.results.map(
            (genre, index) =>
              (expandedGenres || index < 3) && (
                <Link to={`?genres=` + `${genre.slug}`} key={genre.id}>
                  <h4>{genre.name}</h4>
                </Link>
              )
          )}
          <button
            id="scroll-btn"
            type="button"
            onClick={() => setExpandedGenres(!expandedGenres)}
          >
            {expandedGenres ? "Show Less" : "Show More"}
          </button>
        </div>

        <div id="stores">
          <h3>Stores</h3>
          {stores.results.map(
            (store, index) =>
              (expandedStores || index < 3) && (
                <Link to={`?stores=` + `${store.id}`} key={store.id}>
                  <h4>{store.name}</h4>
                </Link>
              )
          )}
          <button
            id="scroll-btn"
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
