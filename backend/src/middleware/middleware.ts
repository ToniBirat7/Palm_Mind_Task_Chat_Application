// Middlewares
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/index.js";
import type { ExtendedError, Socket } from "socket.io";
import cookie from "cookie";

export const authenticateJWTHTTP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: ", No Token Found" });

  try {
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      (req as any).user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const authenticateJWTSocket = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const cookieHeader = socket.handshake.headers.cookie;

  if (!cookieHeader) {
    console.log("No Cookie Header");
    return next(new Error("Authentication failed: no cookie"));
  }

  const cookies = cookie.parse(cookieHeader);
  const token = cookies["auth_token"];
  if (!token) {
    console.log("No auth_token in cookies");
    return next(new Error("Authentication failed: token missing"));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    socket.data.user = payload;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err);
    next(new Error("Authentication failed: invalid token"));
  }
};
