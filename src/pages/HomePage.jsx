import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "./HomePage.css";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from "react-router-dom";
const url = new URL(
  "https://api.rawg.io/api/games?key=f5a6ee95c2244cf89898fde4d42ba530&page_size=40&ordering=-metacritic"
);

function HomePage() {
  const [games, setGames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("q");
  //console.log(query);
  const selectedPlatformId = searchParams.get("platforme");
  useEffect(() => {
    if (query) url.searchParams.set("search", query);
    if (selectedPlatformId)
      url.searchParams.set("platforms", selectedPlatformId);
    console.log(url);
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
  }, [query, selectedPlatformId]);

  return (
    <>
      <Sidebar games={games} setGames={setGames} />
      <h1 className="main-title-1">Best and trending</h1>
      <h1 className="main-title-2">Video Games</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : games.length === 0 ? (
        <Navigate to="/*" />
      ) : (
        <ul className="game-entry">
          {games.map((game) => (
            <li key={game.id}>
              <Link to={`/games/${game.id}`}>
                <img src={game.background_image} alt={game.name} />
                <h2>{game.name}</h2>
                <p>{game.genres.map((genre) => genre.name).join(", ")}</p>
                <p>Rating: {game.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default HomePage;
