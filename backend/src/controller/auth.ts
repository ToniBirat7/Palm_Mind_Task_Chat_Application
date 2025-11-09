// Related to auths
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../config/index.js";
import { User } from "../model/chat.model.js";

export const createUser = async (req: Request, res: Response) => {
  const body: FormData = req.body;

  if (!body) return res.status(400).json({ msg: "No Body" });

  const { fname, lname, email, password, address } = body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(Number(BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email: email,
      password: password,
      lname: lname,
      fname: fname,
      address: address,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ msg: "User created successfully", user: { email } });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const body: UserPayload = req.body;

  if (!body) return res.status(400).json({ msg: "No Body" });

  const { email, password } = body;

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ msg: "User Does Not Exists" });

  // Hash password before JWT
  const salt = await bcrypt.genSalt(Number(BCRYPT_SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user.password === hashedPassword) {
    console.log("Hash Password Match");
  }

  res.status(200).json({ msg: "Password Matched" });
};
