// Related to auths
import type { Request, Response, NextFunction } from "express";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../config/index.js";

import { User } from "../model/chat.model.js";

export const createUser = async (req: Request, res: Response) => {
  const body: UserPayload = req.body;

  if (!body?.email || !body?.password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  const { email, password } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ msg: "User already exists" });
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(Number(BCRYPT_SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res
    .status(201)
    .json({ msg: "User created successfully", user: { email } });
};

export const loginUser = async (req: Request, res: Response) => {
  const body: UserPayload = req.body;

  if (body) {
    console.log("Body is : ", body);
    const email = body.email;
    const pwd = body.password;
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User Does Not Exists" });

  const isPasswordValid = await res.json({ msg: "User Saved" });
  res.send();
};
