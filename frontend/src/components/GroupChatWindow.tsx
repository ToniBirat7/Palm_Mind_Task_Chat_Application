import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import NoChat from "./NoChat";

interface GroupChatWindowProps {
  selectedGroup: {
    id: string;
    name: string;
    avatar: string;
    memberCount: number;
  } | null;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}

interface GroupMessage {
  id: string;
  text: string;
  sender: string;
  receiver: "_chat_room";
  timestamp: Date | string;
  senderId?: string;
}

const GroupChatWindow: React.FC<GroupChatWindowProps> = ({
  selectedGroup,
  socket,
}) => {
  const [messages, setMessages] = useState<GroupMessage[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const handleReceiveMessage = (grpMsg: GroupMessage) => {
      console.log("Message Received ", grpMsg);
      setMessages((prev) => {
        return [...prev, grpMsg];
      });
    };

    socket?.on("receive_message", handleReceiveMessage);

    return () => {
      socket?.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && selectedGroup) {
      const newMessage: GroupMessage = {
        id: `${Date.now()}-${Math.random().toString(36)}`,
        text: inputValue,
        sender: "user", // Will be set to actual name by backend
        receiver: "_chat_room",
        timestamp: new Date(),
      };

      socket?.emit("send_message", newMessage, `_chat_room`);

      setInputValue("");
    }
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid time";
    }

    return dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-main">
      {selectedGroup ? (
        <>
          {/* Chat Header */}
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center text-white font-bold text-sm relative">
                {selectedGroup.avatar}
                <div className="absolute -bottom-1 -right-1 bg-[#1a1a1a] rounded-full px-1.5 py-0.5 border border-[#3a3a3a]">
                  <span className="text-xs text-gray-400">
                    {selectedGroup.memberCount}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedGroup.name}
                </h2>
                <p className="text-xs text-gray-400">
                  {selectedGroup.memberCount} members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMembers(!showMembers)}
                className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
                title="Show members"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2m0 7a1 1 0 110-2 1 1 0 010 2m0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Messages Area */}
            <div
              className={`flex-1 flex flex-col ${
                showMembers ? "border-r border-[#3a3a3a]" : ""
              }`}
            >
              <div className="messages-list">
                {messages.map((message) => {
                  const isMyMessage = message.sender === "user";
                  const senderInitials = isMyMessage
                    ? "ME"
                    : message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2);

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isMyMessage ? "justify-end" : "justify-start"
                      } animate-fade-in`}
                    >
                      <div className="flex flex-col gap-1 max-w-[70%]">
                        {/* Show sender name for group messages */}
                        {!isMyMessage && (
                          <div className="flex items-center gap-2 px-2">
                            <div className="w-6 h-6 bg-[#3a3a3a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {senderInitials}
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                              {message.sender}
                            </span>
                          </div>
                        )}
                        <div
                          className={`${
                            isMyMessage ? "message-sent" : "message-received"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <span
                          className={`text-xs text-gray-500 px-2 ${
                            isMyMessage ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="input-area">
                <button
                  type="button"
                  className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message in group..."
                  className="chat-input flex-1"
                />

                <button
                  type="button"
                  className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9h.01M15 9h.01"
                    />
                  </svg>
                </button>

                <button
                  type="submit"
                  className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16985749 C3.34915502,0.9 2.40734225,0.8429026 1.77946707,1.31768134 C0.994623095,1.95734473 0.837654326,3.0467841 1.15159189,3.98936818 L3.03521743,10.4303611 C3.03521743,10.5874585 3.19218622,10.7445559 3.50612381,10.7445559 L16.6915026,11.5300428 C16.6915026,11.5300428 17.1624089,11.5300428 17.1624089,12.0013349 C17.1624089,12.4726271 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Members Sidebar */}
            {showMembers && (
              <div className="w-64 bg-[#1a1a1a] flex flex-col">
                <div className="px-4 py-3 border-b border-[#3a3a3a]">
                  <h3 className="text-white font-semibold">Group Members</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {selectedGroup.memberCount} members
                  </p>
                </div>
                <div className="p-3 border-t border-[#3a3a3a]">
                  <button className="w-full py-2 px-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Add Member
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <NoChat />
      )}
    </div>
  );
};

export default GroupChatWindow;
