import { useContext, useEffect, useState } from "react"
import { RoomContext } from "../context/RoomContext"

const userType = localStorage.getItem('userType')

export const Join: React.FC = () => {
  const { ws } = useContext(RoomContext);
  const userId = localStorage.getItem('idDoCliente') || localStorage.getItem('idDoPsicologo');
  const userType = localStorage.getItem('userType'); // Defina corretamente o tipo de usuário
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    if (userId && ws && !hasRegistered) {
      ws.emit('registerUser', userId); // Registra o usuário
      setHasRegistered(true); // Marca como registrado
    }
  }, [ws, userId, hasRegistered]);

  const createRoom = () => {
    const from = userType === 'cliente' ? localStorage.getItem('idDoCliente') : localStorage.getItem('idDoPsicologo');
    const to = userType === 'cliente' ? localStorage.getItem('psicologoId') : localStorage.getItem('clienteId');
    
    if (from && to && ws) {
      ws.emit('callUser', { from, to }); // Inicia a chamada
    }
  };

  return (
    <button
      onClick={createRoom}
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white"
    >
      Start a new meeting
    </button>
  );
};
