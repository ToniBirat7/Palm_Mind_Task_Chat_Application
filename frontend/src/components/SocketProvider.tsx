// React Context provider (lazy connect)
import React, { type ReactNode } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SocketContextType {
  socket: Socket | null;
  members: Member[];
}

const SocketContext = React.createContext<SocketContextType>({
  socket: null,
  members: [],
});

export const SocketProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [members, setMembers] = useState<Member[]>([]);
  // Navigator
  const loginNavigator = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    // Handle connection state
    const handleConnect = () => {
      console.log("Socket connected");
      const roomId = "_chat_room";

      socket.emit("join-room", roomId);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    // Handle member events - ADD UNIQUE CHECK
    const handleMember = (memberData: Member[] | [] | Member) => {
      // console.log("Member List:", memberData);

      // Always normalize to an array
      const membersArray = Array.isArray(memberData)
        ? memberData
        : [memberData]; // wrap single object into array

      setMembers((prev) => {
        // use a Map for easy deduplication
        const map = new Map(prev.map((m) => [m._id, m]));

        membersArray.forEach((member) => {
          if (!map.has(member._id)) {
            map.set(member._id, member);
          } else {
            console.log("Member already exists, skipping:", member._id);
          }
        });

        return Array.from(map.values());
      });
    };

    const handleConnectError = (err: Error) => {
      console.log("Socket connection error:", err.message);
      // Redirect to login
      if (err.message.includes("Authentication failed")) {
        loginNavigator("/");
      }
    };

    // Register listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("member", handleMember);
    socket.on("connect_error", handleConnectError);

    // Cleanup on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("member", handleMember);
      socket.off("connect_error", handleConnectError);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, members }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return React.useContext(SocketContext);
};
