import express from "express";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

// Middlewares
app.use(express.json());

// Routes
app.use("/api", routes);

export default app;
