import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [games, setGames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  console.log(query);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games?key=f5a6ee95c2244cf89898fde4d42ba530&page_size=40&search=${
          query ?? ""
        }&ordering=-metacritic`
      )
      .then((response) => {
        const first40Games = response.data.results;
        console.log(first40Games);
        setGames(first40Games);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  return (
    <>
      <Sidebar games={games} />
      <h1 className="main-title-1">Best and trending</h1>
      <h1 className="main-title-2">Video Games</h1>
      <ul className="game-entry">
        {games.map((game) => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>
              <img src={game.background_image} alt={game.name} />
              <h2>{game.name}</h2>
              {/* <p>
                {game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")}
              </p> */}
              <p>{game.genres.map((genre) => genre.name).join(", ")}</p>
              <p>Rating: {game.rating}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
