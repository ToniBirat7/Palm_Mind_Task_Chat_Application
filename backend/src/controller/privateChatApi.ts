// API Controller for Private Chats
import { Conversation } from "../model/chat.model.js";
import { User } from "../model/user.model.js";
import type { Request, Response } from "express";

export const getPrivateChats = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user; // payload
    const { selectedUserId } = req.params; // The other user's ID

    console.log(
      "Fetching chat between:",
      currentUser._id,
      "and",
      selectedUserId
    );

    // Fetch all messages between the two users (both directions)
    const messages = await Conversation.find({
      $or: [
        { sender: currentUser._id, receiver: selectedUserId },
        { sender: selectedUserId, receiver: currentUser._id },
      ],
    })
      .sort({ timestamp: 1 }) // Sort by oldest first
      .limit(10)
      .populate("sender", "fname lname") // Populate sender details
      .populate("receiver", "fname lname") // Populate receiver details
      .lean();

    // Transform messages to match frontend format
    const formattedMessages = messages.map((msg: any) => ({
      id: msg._id.toString(),
      text: msg.message,
      sender:
        msg.sender._id.toString() === currentUser._id
          ? "user"
          : msg.sender.fname,
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

export const deletePrivateChats = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const { userId } = req.params;

    // Delete all messages between the two users
    const result = await Conversation.deleteMany({
      $or: [
        { sender: currentUser._id, receiver: userId },
        { sender: userId, receiver: currentUser._id },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Chat history deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting private chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete chat history",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updatePrivateChats = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message text is required",
      });
    }

    const updatedMessage = await Conversation.findByIdAndUpdate(
      messageId,
      { message },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
