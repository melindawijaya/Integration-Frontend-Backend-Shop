import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AboutView from './page/AboutView'
import HomeView from './page/HomeView'
import NotFoundView from './page/NotFoundView'
import { LoginPage } from './page/Login'
import { RegisterPage } from './page/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />
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
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default App