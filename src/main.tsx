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
import Nave from './routes/Nave.jsx'
import Teste from './routes/Teste.tsx'
import DiarioComponent from './components/DiarioComponent.tsx'
import BlogComponent from './components/BlogComponent.tsx'
import ChatBotComponent from './components/ChatBotComponent.tsx'

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
        element:<Home/>,
        children:[
          {
            
          }
        ]
      },
      {
        path:"/Availability",
        element:<Availability/>
      },
      {
        path: "/Nave",
        element:<Nave/>,
        children:[
          {
            path:'Diario',
            element:<DiarioComponent/>
          },
          {
            path:'ChatBot',
            element:<ChatBotComponent/>
          },
          {
            path:'Blog',
            element:<BlogComponent/>
          },

        ]
      },
      {
        path:"/Teste",
        element:<Teste/>
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
