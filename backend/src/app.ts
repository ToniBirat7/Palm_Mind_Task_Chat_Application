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
