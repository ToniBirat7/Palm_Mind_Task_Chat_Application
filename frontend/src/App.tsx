import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import useSocket from "./hooks/useSocket";

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const socket = useSocket();

  return (
    <div className="chat-container">
      <Sidebar selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default App;
