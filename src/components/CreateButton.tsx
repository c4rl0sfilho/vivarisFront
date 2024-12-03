import { useContext, useEffect } from "react"
import { RoomContext } from "../context/RoomContext"


export const Join: React.FC = () => {
    const {ws} = useContext(RoomContext)

    const userId = localStorage.getItem("idDoCliente") || localStorage.getItem("psicologoId");
  
    useEffect(() => {
      if (userId && ws) {
        ws.emit("registerUser", userId); // Envia o ID do usuário para o servidor
      }
    }, [ws, userId]);
  

    const createRoom = () =>{
        ws.emit("callUser", {
            from: localStorage.getItem("idDoCliente"),
            to: localStorage.getItem("psicologoId")
        })
    }
    return(
    <button onClick={createRoom} className='bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white'>Start a new meeting</button>
    )
    
}