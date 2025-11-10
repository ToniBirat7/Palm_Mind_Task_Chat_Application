// src/hooks/useSocket.ts
import { useMemo } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (): Socket<ServerToClientEvents, ClientToServerEvents> => {
  // create socket only once (memoized)
  const socket = useMemo<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(() => {
    const s = io("http://localhost:3000", {
      transports: ["websocket"], // use WebSocket transport
    });

    return s;
  }, []);

  return socket;
};

export default useSocket;
