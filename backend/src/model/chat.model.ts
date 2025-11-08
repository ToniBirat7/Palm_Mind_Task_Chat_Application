import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({});

const conversationSchema = new Schema({});

export const User = model("User", userSchema);
export const Conversation = model("Conversation", conversationSchema);
