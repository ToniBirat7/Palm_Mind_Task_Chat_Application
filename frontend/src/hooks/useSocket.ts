// hook for components to access socket + status
import { io } from "socket.io-client";

const useSocket = () => {
  const socket = io("http://localhost/3000");
  return socket;
};

export default useSocket;
