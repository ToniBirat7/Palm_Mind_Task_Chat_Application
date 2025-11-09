import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Chat from "./components/Chat";
import { SocketProvider } from "./components/SocketProvider.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route
          path="/chat"
          element={
            <SocketProvider>
              <Chat />
            </SocketProvider>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
