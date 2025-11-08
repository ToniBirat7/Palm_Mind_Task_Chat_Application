import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.tsx";
import { SocketProvider } from "./components/SocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
