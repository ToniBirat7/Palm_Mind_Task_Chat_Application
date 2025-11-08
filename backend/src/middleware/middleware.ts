// Middlewares
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/index.js";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err) return res.status(401).json({ message
    } );
  } catch (error) {}
};
