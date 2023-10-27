import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../pages/GamePage.css";
import Carousel from "../components/Carousel";

function GamePage() {
  const [game, setGame] = useState(null);
  let { id } = useParams();
  const url = `https://rawg.io/api/games/${id}?key=f5a6ee95c2244cf89898fde4d42ba530`;

  const fetchGame = () => {
    axios
      .get(url)
      .then((response) => setGame(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGame();
  }, []);

  if (!game) return <p>Loading...</p>;

  const platformNames = game.platforms.map(
    (platform) => platform.platform.name
  );
  const genreNames = game.genres.map((genre) => genre.name);

  return (
    <>
      <div id="main">
        <h1 id="title">{game.name}</h1>
        <Carousel gameId={id} />
        <ul className="list">
          <li>Platforms: {platformNames.join(", ")}</li>
          <li>
            {game.rating} / {game.rating_top}
          </li>
          <li>Date of release: {game.released}</li>

          <li>Playtime: {game.playtime}</li>

          <li>
            Age restriction:{" "}
            {game.esrb_rating ? game.esrb_rating.name : "No rating yet :("}
          </li>
          <li>Genre: {genreNames.join(", ")} </li>
        </ul>
        <h3>About the game</h3>
        <p id="description">{game.description_raw}</p>
        <Link id="comment" to={`/games/${id}/comments`}>
          Go to comments page
        </Link>
        <p>Link to the publisher's site: </p>
        <Link to={game.website}>
          {game.publishers.map((pub) => (
            <h3 id="publisher" key={pub.id}>
              {pub.name}
            </h3>
          ))}
        </Link>
      </div>
    </>
  );
}

export default GamePage;
