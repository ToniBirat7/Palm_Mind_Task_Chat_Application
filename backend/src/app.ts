import express from "express";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✓ User connected:", socket.id);
  socket.send({ sender: "Server", msg: socket.id });

  socket.on("join-room", (roomId) => {
    console.log("Adding in the room : ", roomId);
    socket.join(roomId);
  });

  socket.on("send_message", (data, roomId) => {
    socket.to(roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("✗ User disconnected:", socket.id);
  });
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

export { server, io };
export default app;
