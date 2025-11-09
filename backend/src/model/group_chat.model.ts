import mongoose from "mongoose";
const { Schema, model } = mongoose;

const groupChatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: String,
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
groupChatSchema.index({ receiver: 1, timestamp: -1 });
groupChatSchema.index({ sender: 1, timestamp: -1 });

export const GroupChat = model("GroupChat", groupChatSchema);
