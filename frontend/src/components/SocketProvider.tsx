// React Context provider (lazy connect)
import React, { type ReactNode } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

interface SocketContextType {
  socket: Socket | null;
  members: Member[];
}

const SocketContext = React.createContext<SocketContextType>({
  socket: null,
  members: [],
});

export const SocketProvider: React.FC<{ children: ReactNode }> = (props) => {
  const { socket, members } = useSocket();
  return (
    <SocketContext.Provider value={{ socket, members }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return React.useContext(SocketContext);
};
