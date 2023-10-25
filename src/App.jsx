import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

import "./App.css";

function App() {
  console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/games/:id" element={<GamePage />}></Route>
          <Route path="/games/:id/comments" element={<CommentsPage />}></Route>
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
