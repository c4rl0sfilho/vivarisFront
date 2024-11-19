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
import ProList from './routes/ProList.tsx'
import Teste from './routes/Teste.tsx'
import Meditacao from './routes/Meditacao.tsx'
import DiarioComponent from './components/DiarioComponent.tsx'
import BlogComponent from './components/BlogComponent.tsx'
import ChatBotComponent from './components/ChatBotComponent.tsx'
import MyConsults from './components/MyConsults.tsx'
import MeusChats from './components/MeusChats.tsx'
import GraficoHumor from './components/GraficoHumor.tsx'
import Settings from './components/Settings.tsx'
import PsicoProfile from './routes/PsicoProfile.tsx'
import UserProfile from './routes/UserProfile.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />
      },
      {
        path: "/Preferences",
        element: <Preferences />
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Availability",
        element: <Availability />
      },
      {
        path: "/PProfile",
        element: <PsicoProfile />
      },
      {
        path: "/CProfile",
        element: <UserProfile />
      },
      {
        path: "/ProList",
        element: <ProList />
      },
      {
        path: "/Nave",
        element: <Nave />,
        children: [
          {
            path: 'Diario',
            element: <DiarioComponent />
          },
          {
            path: 'ChatBot',
            element: <ChatBotComponent />
          },
          {
            path: 'Blog',
            element: <BlogComponent />
          },
          {
            path: 'MeusChats',
            element: <MeusChats />
          },
          {
            path: 'GraficoHumor',
            element: <GraficoHumor />
          },
          {
            path: 'MyConsults',
            element: <MyConsults />
          },
          {
            path: 'Settings',
            element: <Settings />
          },
        ]
      },
      {
        path: '/Meditacao',
        element: <Meditacao />
      },
      {
        path: "/Teste",
        element: <Teste />
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
