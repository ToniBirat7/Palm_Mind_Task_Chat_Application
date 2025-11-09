import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({});

export const User = model("User", userSchema);
