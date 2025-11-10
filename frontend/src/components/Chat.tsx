import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import GroupChatWindow from "./GroupChatWindow";
import { useSocketContext } from "./SocketProvider";
import NoChat from "./NoChat";

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<Member | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
    avatar: string;
    memberCount: number;
  } | null>(null);

  const { socket, members } = useSocketContext();

  console.log("Members", members);

  console.log("Selected User : ", selectedUser);

  return (
    <div className="chat-container">
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        members={members}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
      />
      {selectedGroup && (
        <GroupChatWindow selectedGroup={selectedGroup} socket={socket} />
      )}
      {selectedUser && (
        <ChatWindow selectedUser={selectedUser} socket={socket as any} />
      )}
      {!selectedGroup && !selectedUser && <NoChat></NoChat>}
    </div>
  );
};

export default Chat;
