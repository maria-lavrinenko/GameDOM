import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import LogInPage from "./pages/LogInPage";
import { useState } from "react";

import "./App.css";

function App() {
  console.log(JSON.parse(localStorage.getItem("user")));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [outline, setOutline] = useState("");
  return (
    <>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setOutline={setOutline}
          outline={outline}
        />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/games/:id" element={<GamePage />}></Route>
          <Route
            path="/games/:id/comments"
            element={
              <CommentsPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <LogInPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsOpen={setIsOpen}
                setOutline={setOutline}
                outline={outline}
              />
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
