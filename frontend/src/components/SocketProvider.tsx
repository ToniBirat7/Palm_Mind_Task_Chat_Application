// React Context provider (lazy connect)
import React from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider: React.FC = (props) => {
  const socket = useSocket();
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
