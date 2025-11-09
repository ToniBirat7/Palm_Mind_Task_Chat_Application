import mongoose from "mongoose";
const { Schema, model } = mongoose;

const conversationSchema = new Schema({});
export const Conversation = model("Conversation", conversationSchema);
