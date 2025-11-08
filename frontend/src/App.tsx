import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="chat-container">
      <Sidebar selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default App;
