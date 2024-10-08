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
import Availability from './routes/Availability.tsx'

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
        path:"/Availability",
        element:<Availability/>
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
