import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import Signup from './pages/Signup.jsx'
import NewTransaction from './pages/NewTransaction.jsx'
import 'non.geist'

const myRouter = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/signup',
        element : <Signup/>
      },
      {
        path : '/login',
        element : <Login/>
      },
      {
        path : '/contact',
        element : <Contact/>
      },
      {
        path : '/add',
        element : <NewTransaction/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter}/>
  </StrictMode>,
)
