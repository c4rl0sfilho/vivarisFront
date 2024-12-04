// src/context/SocketContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "../config/socket";

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = getSocket();
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = (): Socket => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket deve ser usado dentro de um SocketProvider.");
  }
  return context;
};
