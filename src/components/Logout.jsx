import React from "react";
import { Link } from "react-router-dom";

function Logout({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log(localStorage);
    setIsLoggedIn(false);
    //localStorage.clear() svuota tutto
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {/* <Link to="/">Back to Home Page</Link> */}
    </div>
  );
}

export default Logout;
