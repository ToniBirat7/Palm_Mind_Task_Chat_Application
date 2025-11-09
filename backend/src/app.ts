import express from "express";
import { authRouter, chatRouter } from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateJWTSocket } from "./middleware/middleware.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.use(authenticateJWTSocket);

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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow Cookies to be sent to the CORS
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/chat", chatRouter);

export { server };
