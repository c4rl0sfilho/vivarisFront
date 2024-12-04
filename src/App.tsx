import { Outlet } from "react-router-dom"
import './App.css'
import { connectSocket } from "./config/socket";
import { SocketProvider } from "./context/SocketContext";
import CallListener from "./components/CallListener";

function App() {
  const socketURL = "http://localhost:8080"; // URL do servidor
  const socket = connectSocket(socketURL);
  socket.connect();
  return (
    <SocketProvider>
      <CallListener/>
       <Outlet/>
    </SocketProvider>
   
  )
}

export default App