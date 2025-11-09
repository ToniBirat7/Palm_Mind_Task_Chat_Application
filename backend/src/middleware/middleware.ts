// Middlewares
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/index.js";
import type { ExtendedError, Socket } from "socket.io";

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
  const cookieHeader: string | undefined = socket.handshake.headers.cookie;

  if (!cookieHeader) return next(new Error("Auth header missing"));

  console.log("Header");

  console.log(cookieHeader);

  const token = cookieHeader.split("=")[1];

  console.log("Cookie");

  console.log(token);

  if (!token) return next(new Error("Auth token missing"));

  try {
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        console.log("Error : Token Is Not Valid ");
        return next(new Error("Invalid token"));
      }
      socket.data.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    next(new Error("Invalid token"));
  }
};
