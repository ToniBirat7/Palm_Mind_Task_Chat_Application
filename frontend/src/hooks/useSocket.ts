// src/hooks/useSocket.ts
import { useMemo } from "react";
import { io, Socket } from "socket.io-client";

// Define types for your server events (customize these later)
interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
}

const useSocket = (): Socket<ServerToClientEvents, ClientToServerEvents> => {
  // create socket only once (memoized)
  const socket = useMemo<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(() => {
    const s = io("http://localhost:3000", {
      transports: ["websocket"], // use WebSocket transport
      autoConnect: true,
    });

    s.on("connect", () => {
      console.log("✓ Connected to server:", s.id);
    });

    s.on("disconnect", (reason) => {
      console.log("✗ Disconnected:", reason);
    });

    s.on("message", (data) => {
      console.log("Message Received ", data);
    });

    return s;
  }, []);

  return socket;
};

export default useSocket;
