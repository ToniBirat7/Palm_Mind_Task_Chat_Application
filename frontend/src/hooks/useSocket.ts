// src/hooks/useSocket.ts
import { useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

// Define types for your server events (customize these later)
interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
}

const useSocket = (): Socket<ServerToClientEvents, ClientToServerEvents> => {
  // Navigator
  const loginNavigator = useNavigate();

  // create socket only once (memoized)
  const socket = useMemo<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(() => {
    const s = io("http://localhost:3000", {
      transports: ["websocket"], // use WebSocket transport
      // autoConnect: true,
    });

    const roomId = "_chat_room";

    s.emit("join-room", roomId);

    s.on("connect", () => {
      console.log("✓ Connected to server:", s.id);
    });

    s.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
      // Redirect to login
      if (err.message.includes("Authentication failed")) {
        loginNavigator("/");
      }
    });

    s.on("disconnect", (reason) => {
      console.log("✗ Disconnected:", reason);
    });

    s.on("receive_message", (data) => {
      console.log("Message Received ", data);
    });

    return s;
  }, []);

  return socket;
};

export default useSocket;
