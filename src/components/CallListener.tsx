import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const CallListener: React.FC = () => {
  const socket = useSocket();
  
  const [incomingCall, setIncomingCall] = useState<{ from: string; roomId: string } | null>(null);

  useEffect(() => {
    if (!socket) {
      console.log('Socket não está disponível');
    } else {
      console.log('Socket conectado com sucesso', socket.id);
    }
  
    
    // Escuta o evento de chamada recebida
    socket.on("incomingCall", ({ from, roomId }) => {
      console.log(`Recebendo chamada de ${from}`);
      setIncomingCall({ from, roomId });
    });

    // Escuta recusas de chamada
    socket.on("callDeclined", ({ message }) => {
      console.log(message);
      setIncomingCall(null);
    });

    return () => {
      socket.off("incomingCall");
      socket.off("callDeclined");
    };
  }, [socket]);

  const acceptCall = () => {
    if (incomingCall) {
      socket.emit("acceptCall", { roomId: incomingCall.roomId });
      setIncomingCall(null);
    }
  };

  const declineCall = () => {
    if (incomingCall) {
      socket.emit("declineCall", { roomId: incomingCall.roomId });
      setIncomingCall(null);
    }
  };

  return (
    <div>
      {incomingCall ? (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 w-80 border">
          <p className="text-lg font-semibold text-gray-800">
            Chamada de <span className="text-blue-600">{incomingCall.from}</span>
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={acceptCall}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Aceitar
            </button>
            <button
              onClick={declineCall}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Recusar
            </button>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
  
};

export default CallListener;
