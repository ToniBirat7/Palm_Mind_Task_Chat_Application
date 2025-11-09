// src/hooks/useSocket.ts
import { useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const useSocket = (): { socket: Socket<ServerToClientEvents, ClientToServerEvents>; members: Member[] } => {
  // Navigator
  const loginNavigator = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);

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

    s.on("member", (memberData) => {
      console.log("Member Details : ", memberData);
      setMembers((prev) => {
        return [...prev, memberData];
      });
    });

    return s;
  }, []);

  return { socket, members };
};

export default useSocket;
