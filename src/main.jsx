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
import TransactionsList from './pages/TransactionsList.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import 'non.geist'


const queryClient = new QueryClient();

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
      {
        path : '/transactions',
        element : <TransactionsList/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={myRouter}/>
    </QueryClientProvider>
  </StrictMode>,
)
