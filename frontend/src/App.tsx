// Basic HTML skeleton for the chat UI.
// No Tailwind, no Socket client — just semantic markup ready for styling and wiring.

import { useEffect, useRef, useState } from "react";

type User = { id: string; name: string; online?: boolean };
type Message = { id: string; userId: string; name: string; text: string; time: string };

// Visually attractive chat UI using Tailwind CSS. No Socket.IO wiring.
export default function App() {
  const [users] = useState<User[]>([
    { id: "u1", name: "Alice", online: true },
    { id: "u2", name: "Bob", online: true },
    { id: "u3", name: "Eve", online: false },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", userId: "u1", name: "Alice", text: "Hey! Welcome to Palm Mind.", time: "10:01" },
    { id: "m2", userId: "u2", name: "Bob", text: "Nice place to collaborate 👋", time: "10:02" },
  ]);

  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim()) return;
    const newMsg: Message = {
      id: String(Date.now()),
      userId: "u1",
      name: "You",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((m) => [...m, newMsg]);
    setText("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-[85vh] bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-12">
        {/* Left column - users */}
        <aside className="col-span-3 bg-slate-50 p-6 border-r">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Active</h2>
            <span className="text-sm text-slate-500">{users.length}</span>
          </div>
          <ul className="space-y-4">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${u.online ? "bg-emerald-500" : "bg-gray-400"}`}>
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-slate-500">{u.online ? "Online" : "Offline"}</div>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main chat area */}
        <section className="col-span-9 flex flex-col">
          <header className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-2xl font-bold">Palm Mind Chat</h1>
              <p className="text-sm text-slate-500">Real-time collaboration for your team</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">Users: <span className="font-semibold">{users.length}</span></div>
              <div className="text-sm text-slate-600">Messages: <span className="font-semibold">{messages.length}</span></div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-slate-50">
            <ul className="space-y-4 max-w-3xl mx-auto">
              {messages.map((m) => {
                const mine = m.userId === "u1";
                return (
                  <li key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`${mine ? "bg-indigo-600 text-white" : "bg-white text-slate-800 border"} max-w-[70%] p-4 rounded-2xl shadow`}>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white font-semibold">{m.name.charAt(0)}</div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <time className="text-xs text-slate-400 ml-3">{m.time}</time>
                      </div>
                      <div className="text-sm leading-relaxed">{m.text}</div>
                    </div>
                  </li>
                );
              })}
              <div ref={messagesEndRef} />
            </ul>
          </div>

          <footer className="p-4 border-t">
            <form className="max-w-4xl mx-auto flex gap-3" onSubmit={handleSend}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 rounded-full border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Type your message..."
                aria-label="Type a message"
              />
              <button type="submit" className="bg-indigo-600 text-white rounded-full px-6 py-3 font-semibold shadow hover:bg-indigo-700 disabled:opacity-50" disabled={!text.trim()}>
                Send
              </button>
            </form>
          </footer>
        </section>
      </div>
    </div>
  );
}
