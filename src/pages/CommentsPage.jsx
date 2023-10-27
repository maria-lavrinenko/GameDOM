import React, { useState, useEffect } from "react";
import "./CommentsPage.css";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import DefaultPicture from "../assets/DefaultPicture.png";

const initialValues = { userName: "", text: "" };

function CommentsPage({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const [formData, setFormData] = useState(initialValues);
  const [allComments, setAllComments] = useState([]);
  const { id } = useParams();
  const [game, setGame] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchGame = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=f5a6ee95c2244cf89898fde4d42ba530`
      );

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
        `https://gameapp-g.adaptable.app/comments?gameId=${id}&_expand=user`
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
        userId: currentUser.id,
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

  async function handleDelete(commentId) {
    try {
      const response = await axios.delete(
        "https://gameapp-g.adaptable.app/comments/" + commentId
      );

      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  }

  if (!allComments || !game) {
    return <p>"Loading ..."</p>;
  }

  return (
    <>
      <section className="game-comment-page">
        <h1>{game.name}</h1>
        <div className="img-comment-section">
          <div className="game-comment-image">
            <img
              src={game.background_image ?? DefaultPicture}
              alt={game.name}
            />
            <div id="newCommentForm"></div>
            {isLoggedIn ? (
              <form onSubmit={handleSubmit}>
                <fieldset id="new-comment-fieldset">
                  <legend>New comment from {currentUser.userName}</legend>

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
            ) : (
              <h2>
                Please log in to leave a comment!
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </h2>
            )}
          </div>
          <div id="allComments">
            {allComments.map((comment) => {
              return (
                <fieldset key={comment.id}>
                  <p>
                    <span>User name: </span>
                    {comment.user.userName}
                  </p>
                  <p>
                    <span>Comment:</span> {comment.text}
                  </p>

                  <p>
                    <span>Date</span>: {comment.date}
                  </p>

                  <p>
                    {currentUser && comment.userId === currentUser.id ? (
                      <p>
                        <button
                          onClick={() => {
                            handleDelete(comment.id);
                          }}
                        >
                          Delete
                        </button>
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </p>
                </fieldset>
              );
            })}
          </div>
        </div>
        <hr />
      </section>
    </>
  );
}

export default CommentsPage;
