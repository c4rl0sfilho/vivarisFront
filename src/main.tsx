import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


//pages
import Login from './routes/Login'
import Register from './routes/Register'
import Preferences from './routes/Preferences'
import Home from './routes/Home'
import Availability from './routes/Availability'
import Nave from './routes/Nave.jsx'
import ProList from './routes/ProList'
import Teste from './routes/Teste'
import Meditacao from './routes/Meditacao'
import DiarioComponent from './components/DiarioComponent'
import BlogComponent from './components/BlogComponent'
import ChatBotComponent from './components/ChatBotComponent'
import MyConsults from './components/MyConsults'
import MeusChats from './components/Chat/MeusChats'
import GraficoHumor from './components/GraficoHumor'
import Settings from './components/Settings'
import PsicoProfile from './routes/PsicoProfile'
import UserProfile from './routes/UserProfile'
import PaymentStatus from './routes/PaymentStatus'
import { VideoCallHome } from './routes/VideoCall/VideoCallHome'

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
        path: "/PaymentStatus",
        element: <PaymentStatus/>
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
      },
      {
        path: "/VideoCall/VideoCallHome",
        element: <VideoCallHome />
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
