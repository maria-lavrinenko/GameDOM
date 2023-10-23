import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        const backgroundImageUrl = apiData.background_image;
        const videoUrl = apiData.clip ? apiData.clip.clip : null;

        axios
          .get(
            `https://rawg.io/api/games/${gameId}/screenshots?key=f5a6ee95c2244cf89898fde4d42ba530`
          )
          .then((screenshotsResponse) => {
            const screenshots = screenshotsResponse.data.results.map(
              (screenshot) => screenshot.image
            );

            // Verifica la presenza del video prima di impostare i dati
            if (videoUrl) {
              setData([backgroundImageUrl, videoUrl, ...screenshots]);
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
    <div style={{ width: "65vw" }}>
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            style={{ display: index === currentItem ? "block" : "none" }}
          >
            {index === 0 && item ? (
              <img
                style={{ width: "100%", height: "auto" }}
                src={item}
                alt={`Image ${index}`}
              />
            ) : index === 1 && item ? (
              <video src={item} controls width="100%" height="auto" />
            ) : (
              <img
                style={{ width: "100%", height: "auto" }}
                src={item}
                alt={`Image ${index}`}
              />
            )}
          </div>
        ))}
      </div>
      {data.length > 1 && (
        <div>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {data.length > 1 && (
        <p>
          Showing Screenshot {currentItem} of {data.length - 1}
        </p>
      )}
    </div>
  );
};

export default Carousel;
