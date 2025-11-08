// React Context provider (lazy connect)
import React, { type ReactNode } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

const SocketContext = React.createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: ReactNode }> = (props) => {
  const socket = useSocket();
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return React.useContext(SocketContext);
};
