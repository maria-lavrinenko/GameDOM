import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  //   const notify = () => toast("Wow so easy !");
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

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

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Gamer</legend>

          <div>
            <label htmlFor="userName">Your User Name</label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Your password</label>
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

export default SignUpPage;
