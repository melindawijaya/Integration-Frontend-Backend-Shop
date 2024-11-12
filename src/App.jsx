import { useState, useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './App.css'
import AboutView from './page/AboutView'
import Navbar from './navbar/Navbar'
import HomeView from './page/HomeView'
import NotFoundView from './page/NotFoundView'
import Login from './page/Login'
import { RegisterPage } from './page/Register'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Cek apakah user sudah login atau belum
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setIsAuthenticated(false)
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <HomeView /> : <Navigate to="/login" />
    },
    {
      path: '/about',
      element: <AboutView />
    },
    {
      path: '/not-found',
      element: <NotFoundView />
    },
    {
      path: '/login',
      element: isAuthenticated ? <Navigate to="/" /> : <Login/>
    },
    {
      path: '*',
      element: <NotFoundView/>
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
  ]);

  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout}/>}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
