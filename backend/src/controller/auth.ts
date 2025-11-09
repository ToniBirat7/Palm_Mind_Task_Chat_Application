// Related to auths
import type { Request, Response, NextFunction } from "express";
// import { Jwt } from "jsonwebtoken";

import { User } from "../model/chat.model.js";

export const createUser = async (req: Request, res: Response) => {
  const body: UserPayload = req.body;

  if (body) {
    console.log("Body is : ", body);
    const email = body.email;
    const pwd = body.password;
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User Does Not Exists" });
  res.json({ msg: "User Saved" });
};

export const loginUser = (req: Request, res: Response) => {
  res.send();
};
