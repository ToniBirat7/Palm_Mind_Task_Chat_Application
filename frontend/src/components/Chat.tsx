import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="chat-container">
      <Sidebar selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;
