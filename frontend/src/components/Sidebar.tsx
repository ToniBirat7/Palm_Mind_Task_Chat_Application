import React, { useState } from "react";

interface SidebarProps {
  selectedUser: string | null;
  onSelectUser: (userId: string) => void;
  members: Member[];
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedUser,
  onSelectUser,
  members,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock users data
  // const users = [
  //   { id: "1", name: "John Doe", status: "online", avatar: "JD" },
  //   { id: "2", name: "Sarah Smith", status: "online", avatar: "SS" },
  //   { id: "3", name: "Mike Johnson", status: "offline", avatar: "MJ" },
  //   { id: "4", name: "Emma Wilson", status: "online", avatar: "EW" },
  //   { id: "5", name: "Alex Brown", status: "offline", avatar: "AB" },
  // ];

  const users = members;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#3a3a3a]">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-[#3a3a3a]">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="chat-input w-full"
        />
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className={`user-item ${
                selectedUser === user.id ? "active" : ""
              }`}
            >
              <div className="relative">
                <div className="avatar">{user.avatar}</div>
                {user.status === "online" && (
                  <div className="status-online absolute bottom-0 right-0"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{user.name}</p>
                <p className="text-gray-400 text-sm truncate">
                  {user.status === "online" ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-12 text-center text-gray-400">
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
