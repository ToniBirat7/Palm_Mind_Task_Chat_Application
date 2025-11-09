import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { useSocketContext } from "./SocketProvider";

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<Member | null>(null);

  const { socket, members } = useSocketContext();

  console.log("Members", members);

  return (
    <div className="chat-container">
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        members={members}
      />
      <ChatWindow selectedUser={selectedUser} socket={socket as any} />
    </div>
  );
};

export default Chat;
