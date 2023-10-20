import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/games/:id" element={<GamePage />}></Route>
          <Route path="/games/:id/comments" element={<CommentsPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
