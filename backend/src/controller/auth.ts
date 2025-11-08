// Related to auths
import type { Request, Response, NextFunction } from "express";
import { Jwt } from "jsonwebtoken";

import { User } from "../model/chat.model.js";

export const createUser = (req: Request, res: Response) => {
  const body: UserPayload = req.body;

  if (body) {
    console.log("Body is : ", body);
    const email = body.email;
    const pwd = body.password;
  }

  res.json({ msg: "User Saved" });
};

export const loginUser = (req: Request, res: Response) => {
  res.send();
};
