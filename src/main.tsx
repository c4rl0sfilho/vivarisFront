import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


//pages
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'
import Preferences from './routes/Preferences.tsx'
import Home from './routes/Home.tsx'
import Teste from './routes/Teste.tsx'
import Availability from './routes/Availability.tsx'
import Nave from './routes/Nave.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<Login/>,
      },
      {
        path:"/Register",
        element:<Register/>
      },
      {
        path:"/Preferences",
        element:<Preferences/>
      },
      {
        path:"/Home",
        element:<Home/>
      },
      {
        path:"/Teste",
        element:<Teste/>
      },
      {
        path:"/Availability",
        element:<Availability/>
      },
      {
        path: "/Nave",
        element:<Nave/>
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
