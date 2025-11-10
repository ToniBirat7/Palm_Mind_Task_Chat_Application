import express from "express";
import { apiRouter, authRouter, chatRouter } from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateJWTSocket } from "./middleware/middleware.js";
import { Conversation } from "./model/chat.model.js";
import { GroupChat } from "./model/group_chat.model.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware for Socket JWT
io.use(authenticateJWTSocket);

const socket_member = new Map<string, Member>();

io.on("connection", (socket) => {
  console.log("✓ User connected:", socket.id);
  socket.send({ sender: "Server", msg: socket.id });

  socket.on("join-room", (roomId) => {
    const userId = socket.data.user._id;

    // Check if this user is already in the map (preventing duplicates)
    const isNewUser = !socket_member.has(userId);

    if (isNewUser) {
      console.log("Adding in the room:", roomId);
      socket.join(roomId);

      // Prepare Memeber
      const member = socket.data.user;
      member.status = true;
      member.avatar = member.name.split(" ")[0];

      // Broadcast to OTHER users in room (not including sender)
      socket.to(roomId).emit("member", member);

      // Send list of existing members to the new user
      socket.emit("member", Array.from(socket_member.values()));

      // Add the socket in the Map
      socket_member.set(userId, member);

      // Add itself in the chat
      console.log(`"Member ${member.name} Joined Room ${roomId}"`);
    } else {
      console.log(
        `"Member ${socket.data.user.name} reconnected - already in room ${roomId}"`
      );
    }
  });

  socket.on("private-room", (privateRoomId) => {
    console.log("Private-Room : ", privateRoomId);
    socket.join(privateRoomId);
  });

  socket.on("send_private_message", async (msg, receiverId) => {
    const sender = socket.data.user;

    // user rooms
    const receiverRoom = `${receiverId}`;
    const senderRoom = `${sender._id}`;

    // Save to DB with correct format
    const savedMsg = await Conversation.create({
      sender: sender._id,
      receiver: receiverId,
      message: msg.text,
      timestamp: msg.timestamp,
    });

    // message for receiver
    const messageToReceiver = {
      ...msg,
      sender: sender.name,
      // senderId: sender._id, // Don't need atm
    };

    // message for sender
    const messageToSender = {
      ...msg,
      sender: "user",
      // senderId: sender._id, // Don't need atm
    };

    // to receiver
    io.to(receiverRoom).emit("receive_private_message", messageToReceiver);

    // to sender (for instant UI update)
    io.to(senderRoom).emit("receive_private_message", messageToSender);
  });

  // Group Message Event
  socket.on("send_message", async (grpMsg, roomId) => {
    console.log("Received Msg : ", grpMsg);

    const sender = socket.data.user;

    // Save to DB with correct format
    const savedMsg = await GroupChat.create({
      sender: sender._id,
      receiver: roomId,
      message: grpMsg.text,
      timestamp: grpMsg.timestamp,
    });

    // Message for other members in the room
    const messageToOthers = {
      ...grpMsg,
      sender: sender.name,
    };

    // Message for sender (mark as "user")
    const messageToSender = {
      ...grpMsg,
      sender: "user",
    };

    // Broadcast to others in room
    socket.to(roomId).emit("receive_message", messageToOthers);

    // Send back to sender (for instant UI update)
    socket.emit("receive_message", messageToSender);
  });

  socket.on("disconnect", () => {
    console.log("✗ User disconnected:", socket.id);
    // Remove user from map on disconnect if you want
    const userId = socket.data.user._id;
    socket_member.delete(userId);
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
app.use("/api/v1", apiRouter);

export { server };
