import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "./HomePage.css";
import Sidebar from "../components/Sidebar";
import DefaultPicture from "../assets/DefaultPicture.png";
import logoSmall from "../assets/logo-small.png";
import { useSearchParams } from "react-router-dom";
const url = new URL(
  "https://api.rawg.io/api/games?key=f5a6ee95c2244cf89898fde4d42ba530&page_size=40&ordering=-metacritic"
);

function HomePage() {
  const [games, setGames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("q");
  //console.log(query);
  const selectedPlatformId = searchParams.get("platforme");
  const selectedGenre = searchParams.get("genres");
  const selectedStores = searchParams.get("stores");

  useEffect(() => {
    if (query) url.searchParams.set("search", query);
    if (selectedPlatformId)
      url.searchParams.set("platforms", selectedPlatformId);
    if (selectedGenre) url.searchParams.set("genres", selectedGenre);
    // console.log(url);
    if (selectedStores) url.searchParams.set("stores", selectedStores);
    axios
      .get(url)
      .then((response) => {
        const first40Games = response.data.results;
        //console.log(first40Games);
        setGames(first40Games);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [query, selectedPlatformId, selectedGenre, selectedStores]);

  const handleSortChange = (e) => {
    if (!games) return;
    const key = e.target.value;
    let sortedGames;
    if (key === "name") {
      sortedGames = games.toSorted((a, b) => a[key].localeCompare(b[key]));
    } else if (key === "rating") {
      sortedGames = games.toSorted((a, b) => {
        return b.rating - a.rating;
      });
    } else {
      sortedGames = games.toSorted((a, b) => {
        const dateA = new Date(a.released);
        const dateB = new Date(b.released);
        return dateB - dateA;
      });
    }

    setGames(sortedGames);
    setSortBy(key);
  };

  return (
    <>
      <div className="home-page">
        <Sidebar games={games} setGames={setGames} />

        <div className="header-container">
          <h1 className="main-title-1">Best and trending</h1>
          <h1 className="main-title-2">Video Games 🎮</h1>
        </div>

        <div className="sort-container">
          <select id="sort-select" onChange={handleSortChange} value={sortBy}>
            <option value="">Sort by: </option>
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="rating">Sort by: Rating</option>
            <option value="released">Sort by: Release Date</option>
          </select>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : games.length === 0 ? (
          <Navigate to="/*" />
        ) : (
          <ul className="game-entry">
            {games.map((game) => (
              <li key={game.id}>
                <Link
                  to={`/games/${game.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="game-element">
                    <img
                      className="game-image"
                      src={game.background_image ?? DefaultPicture}
                      alt={game.name}
                    />
                    <h2 className="game-name">{game.name}</h2>
                    <p className="game-genre">
                      {game.genres.map((genre) => genre.name).join(", ")}
                    </p>
                    <p className="game-rating">{game.rating}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default HomePage;
