// For Db, Redis Connection
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
export const NODE_ENV = process.env.NODE_ENV;

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables");
    }
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// PORT
export const PORT: number = parseInt(process.env.PORT || "3000", 10);
