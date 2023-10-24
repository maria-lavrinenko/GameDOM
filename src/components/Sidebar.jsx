import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

function Sidebar({ games, setGames }) {
  // console.log(games);

  const [platforms, setPlatforms] = useState();
  const [searchParams] = useSearchParams();
  const selectedPlatformId = searchParams.get("platforme");

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/platforms?key=f5a6ee95c2244cf89898fde4d42ba530"
      );
      console.log("platforms", response.data);
      setPlatforms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlatformFilter = (id) => {
    if (id) {
      const gamesToDisplay = games.filter((game) => {
        return game.platforms.includes(id);
      });
      console.log(gamesToDisplay);
      setGames(gamesToDisplay);
    } else {
      setGames(games);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  if (!platforms) {
    return "Loading";
  }

  // useEffect(() => {
  //   handlePlatformFilter(selectedPlatformId);
  // }, [selectedPlatformId]);

  return (
    <>
      <h2>Platforms</h2>

      {platforms.results.map((platforme) => (
        <Link to={`?platforme=` + `${platforme.id}`}>
          <h3>{platforme.name}</h3>
        </Link>
      ))}
    </>
  );
}

export default Sidebar;
