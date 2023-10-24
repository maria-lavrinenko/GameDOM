import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Sidebar from "../components/Sidebar";

function HomePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.rawg.io/api/games?key=f5a6ee95c2244cf89898fde4d42ba530&page_size=40"
      )
      .then((response) => {
        const first40Games = response.data.results;
        console.log(first40Games);
        setGames(first40Games);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {/* <Sidebar games={games} setGames={setGames} /> */}
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>
              <h2>{game.name}</h2>
              <img
                style={{
                  width: "14rem",
                }}
                src={game.background_image}
                alt={game.name}
              />
              <p>Rating: {game.rating}</p>
              <p>
                {game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
