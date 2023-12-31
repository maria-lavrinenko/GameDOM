import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm({ setIsOpen, outline, setOutline }) {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const stateToPass = { fromSignUp: true };
  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newUser = {
        ...formData,
      };
      const response = await axios.post(
        "https://gameapp-g.adaptable.app/users",
        newUser
      );
      setOutline("5px solid #e1ce7a");
      setTimeout(() => {
        setIsOpen(false);
        navigate("/login", { state: stateToPass });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="signup-border" id="signUp-container">
          <legend className="signup-legend">New Gamer</legend>

          <div>
            <label className="signup-label" htmlFor="userName">
              Your User Name
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="signup-label" htmlFor="password">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button>Submit the subscription</button>
        </fieldset>
      </form>
    </>
  );
}

export default SignUpForm;
