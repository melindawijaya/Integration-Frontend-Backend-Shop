import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./navbar/Navbar";
import HomeView from "./page/HomeView";
import Login from "./page/Login";
import NotFoundView from "./page/NotFoundView";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && location.pathname !== "/login" && (
        <Navbar onLogout={handleLogOut} />
      )}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomeView /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default App;