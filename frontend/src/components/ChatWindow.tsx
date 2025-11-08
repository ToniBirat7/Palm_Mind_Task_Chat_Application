import React, { useState } from "react";

interface ChatWindowProps {
  selectedUser: string | null;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How are you doing?",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "I'm doing great! Just working on the chat app. How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: "3",
      text: "That sounds cool! Are you using React?",
      sender: "other",
      timestamp: new Date(Date.now() - 3400000),
    },
    {
      id: "4",
      text: "Yes! React with TypeScript and Tailwind CSS. Really clean setup!",
      sender: "user",
      timestamp: new Date(Date.now() - 3300000),
    },
    {
      id: "5",
      text: "Nice! The UI looks amazing with that monochromatic theme 🖤",
      sender: "other",
      timestamp: new Date(Date.now() - 100000),
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock user data
  const users: Record<string, { name: string; avatar: string }> = {
    "1": { name: "John Doe", avatar: "JD" },
    "2": { name: "Sarah Smith", avatar: "SS" },
    "3": { name: "Mike Johnson", avatar: "MJ" },
    "4": { name: "Emma Wilson", avatar: "EW" },
    "5": { name: "Alex Brown", avatar: "AB" },
  };

  const currentUser = selectedUser && users[selectedUser];

  return (
    <div className="chat-main">
      {selectedUser && currentUser ? (
        <>
          {/* Chat Header */}
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="avatar">{currentUser.avatar}</div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {currentUser.name}
                </h2>
                <p className="text-xs text-gray-400">Active now</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
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

          {/* Messages Area */}
          <div className="messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div className="flex flex-col gap-1">
                  <div
                    className={`${
                      message.sender === "user"
                        ? "message-sent"
                        : "message-received"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <span
                    className={`text-xs text-gray-500 px-2 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
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
              placeholder="Aa"
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
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="w-24 h-24 mx-auto text-[#2a2a2a]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              Select a conversation
            </h2>
            <p className="text-gray-500">
              Choose from your messages or start a new chat
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
