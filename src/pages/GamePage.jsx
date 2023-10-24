import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomePage from "./HomePage";
import axios from "axios";
import Navbar from "../components/Navbar";
// import "../components/Sidebar"
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
    console.log(game);
  }, []);

  if (!game) return <p>Loading...</p>;
  console.log(game);
  const platformNames = game.platforms.map(
    (platform) => platform.platform.name
  );
  const genreNames = game.genres.map((genre) => genre.name);
  return (
    <>
      <div>
        <h1>{game.name}</h1>
        {/* <p>
          {game.alternative_names.map((name) => (
            <span>{name}</span>
          ))}
        </p> */}
        {/* <img src={game.background_image} /> */}
        <Carousel gameId={id} />
        <ul style={{ listStyleType: "none" }}>
          <li>Platforms: {platformNames.join(", ")}</li>
          <li>
            {game.rating} / {game.rating_top}
          </li>
          <li>Date of release: {game.platforms.released_at}</li>
          <li>Playtime: {game.playtime}</li>
          <li>Age restriction: {game.esrb_rating.name}</li>
          <li>Genre: {genreNames.join(", ")} </li>
        </ul>
        <h3>About the game</h3>
        <p>{game.description_raw}</p>
        <Link to={`/games/${id}/comments`}>Go to comments page</Link>
        <p>Link to the publisher's site: </p>
        <Link to={game.website}>
          {game.publishers.map((pub) => (
            <h3 key={pub.id}>{pub.name}</h3>
          ))}
        </Link>
      </div>
    </>
  );
}

export default GamePage;
