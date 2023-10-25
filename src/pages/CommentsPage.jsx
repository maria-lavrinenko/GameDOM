import React, { useState, useEffect } from "react";
import "./CommentsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialValues = { userName: "", text: "" };

function CommentsPage() {
  const [formData, setFormData] = useState(initialValues);
  const [allComments, setAllComments] = useState([]);
  const { id } = useParams();
  const [game, setGame] = useState();

  const fetchGame = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=f5a6ee95c2244cf89898fde4d42ba530`
      );
      console.log(response.data);
      setGame(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  const fetchAllComments = async () => {
    try {
      const response = await axios.get(
        `https://gameapp-g.adaptable.app/comments?gameId=${id}`
      );

      setAllComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, [id]);

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newComment = {
        ...formData,
        gameId: Number(id),
        date: new Date().toLocaleString(undefined),
      };
      const response = await axios.post(
        "https://gameapp-g.adaptable.app/comments",
        newComment
      );
      setFormData(initialValues);
      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  }

  if (!allComments || !game) {
    return <p>"Loading ..."</p>;
  }

  console.log(allComments);

  return (
    <>
      <div>
        <h1>{game.name}</h1>
      </div>
      <div>
        <img src={game.background_image} />
      </div>
      <div id="allComments">
        {allComments.map((comment) => {
          return (
            <article key={comment.id}>
              <p>
                User name: <span>{comment.userName}</span>
              </p>
              <p>Comment: {comment.text}</p>
              {comment.date ? <p>Date: {comment.date}</p> : ""}
            </article>
          );
        })}
      </div>

      <hr />
      <div id="newCommentForm"></div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New comment</legend>

          {/* <div>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div> */}

          <div>
            <label htmlFor="comment">Your comment</label>
            <textarea
              type="text"
              id="text"
              value={formData.text}
              onChange={handleChange}
            />
          </div>
          <button>Submit the comment</button>
        </fieldset>
      </form>
    </>
  );
}

export default CommentsPage;
