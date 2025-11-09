import mongoose from "mongoose";
const { Schema, model } = mongoose;

const conversationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
conversationSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

export const Conversation = model("Conversation", conversationSchema);
