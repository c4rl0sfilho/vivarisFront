import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (url: string): Socket => {
  if (!socket) {
    socket = io(url);  // A conexão será feita automaticamente
    socket.on('connect', () => {
      console.log('Socket conectado com sucesso, ID:', socket?.id);
    });
    socket.on('disconnect', () => {
      console.log('Socket desconectado');
    });
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    // Conecta automaticamente ao servidor
    socket = connectSocket("http://localhost:8080");
  }
  return socket;
};
