import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DefaultPicture from "../assets/DefaultPicture.png"; // Importa l'immagine predefinita
import "../pages/GamePage.css";

const Carousel = ({ gameId }) => {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${gameId}?key=f5a6ee95c2244cf89898fde4d42ba530`
      )
      .then((response) => {
        const apiData = response.data;
        const backgroundImageUrl = {
          src: apiData.background_image || DefaultPicture, // Usa DefaultPicture se backgroundImageUrl non è definito
          type: "image",
        };

        const videoUrl = apiData.clip ? apiData.clip.clip : null;

        axios
          .get(
            `https://rawg.io/api/games/${gameId}/screenshots?key=f5a6ee95c2244cf89898fde4d42ba530`
          )
          .then((screenshotsResponse) => {
            const screenshots = screenshotsResponse.data.results.map(
              (screenshot) => ({ src: screenshot.image, type: "image" })
            );

            if (videoUrl) {
              setData([
                backgroundImageUrl,
                { src: videoUrl, type: "video" },
                ...screenshots,
              ]);
            } else {
              setData([backgroundImageUrl, ...screenshots]);
            }
          })
          .catch((error) => console.log(error));
      });
  }, [gameId]);

  const handleNext = () => {
    if (currentItem < data.length - 1) {
      setCurrentItem(currentItem + 1);
    }
  };

  const handlePrev = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    }
  };

  return (
    <div
      className="carousel"
      // style={{ width: "65vw" }}
    >
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="cimage"
            style={{ display: index === currentItem ? "block" : "none" }}
          >
            {item.type === "image" ? (
              <img
                className="cimage"
                // style={{ width: "100%", height: "auto" }}
                src={item.src}
                alt={`Image ${index}`}
              />
            ) : (
              <video
                className="cimage"
                src={item.src}
                controls
                width="100%"
                height="auto"
              />
            )}
            {data.length > 1 && (
              <>
                <button className="previous" onClick={handlePrev}>
                  prev
                </button>
                <button className="next" onClick={handleNext}>
                  next
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      {/* {data.length > 1 && (
        <p id="ctext">
          Showing Screenshot {currentItem + 1} of {data.length - 1}
        </p>
      )} */}
    </div>
  );
};

export default Carousel;
