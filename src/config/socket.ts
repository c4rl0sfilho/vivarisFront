import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (url: string): Socket => {
  if (!socket) {
    socket = io(url, {
      autoConnect: true, // Evita conexão automática
      transports: ["polling", "websocket"],
    });
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket não inicializado. Chame connectSocket primeiro.");
  }
  return socket;
};
