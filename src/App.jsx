import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./navbar/Navbar";
import HomeView from "./page/HomeView";
import Login from "./page/Login";
import NotFoundView from "./page/NotFoundView";
import AboutView from "./page/AboutView";
import CreateShop from "./page/CreateShop";
import UpdateShop from "./page/UpdateShop";
import Shops from "./page/Shops";
import Products from "./page/Products";
import DetailShop from "./page/DetailShop";
import CreateProduct from "./page/CreateProduct";
import DetailProduct from "./page/DetailProduct";
import UpdateProduct from "./page/UpdateProduct";

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
      {isAuthenticated && <Navbar onLogout={handleLogout}/>}
      
      <RouterProvider router={router} />
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

        <Route
          path="/about"
          element={<AboutView />}
        />

        <Route
          path="/create-shop"
          element={<CreateShop />}
        />

        <Route
          path="/create-product"
          element={<CreateProduct />}
        />

        <Route
          path="/update-shop/:id"
          element={<UpdateShop />}
        />

        <Route
          path="/shops"
          element={<Shops />}
        />

        <Route
          path="/shops/:id"
          element={<DetailShop />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<DetailProduct />}
        />

        <Route
          path="/update-product/:id"
          element={<UpdateProduct />}
        />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
  );
}

export default App;


export default App;