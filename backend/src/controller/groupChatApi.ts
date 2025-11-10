// Group Chat API

// API Controller for Private Chats
import { GroupChat } from "../model/group_chat.model.js";
import type { Request, Response } from "express";

export const getGroupChat = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user; // payload
    const { roomId } = req.params; // Global Room Chat

    console.log(
      "Fetching chat for the User : ",
      currentUser._id,
      "Group",
      roomId
    );

    // Fetch all messages between the two users (both directions)
    const messages = await GroupChat.find({
      $or: [{ receiver: roomId }],
    })
      .sort({ timestamp: 1 }) // Sort by oldest first
      .limit(10)
      .populate("sender", "fname lname") // Populate sender details
      .lean();

    // Transform messages to match frontend format
    const formattedMessages = messages.map((msg: any) => ({
      id: msg._id.toString(),
      text: msg.message,
      sender:
        msg.sender._id.toString() === currentUser._id
          ? "user"
          : msg.sender.fname,
      receiver: msg.receiver,
      timestamp: msg.timestamp,
    }));

    res.status(200).json({
      data: formattedMessages,
      count: formattedMessages.length,
    });
  } catch (error) {
    console.error("Error fetching private chats:", error);
    res.status(500).json({
      err: error,
    });
  }
};
