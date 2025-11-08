// src/hooks/useSocket.ts
import { useEffect, useMemo, useState } from "react";
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
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [connected, setConnected] = useState<Boolean>(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log("✓ Connected to server:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("✗ Disconnected:", reason);
    });

    socket.on("message", (data) => {
      console.log(`📩 Message received: ${data}`);
    });

    // cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  if connected {
    return socket;
  }
  else {

    return false
  }

};

export default useSocket;
