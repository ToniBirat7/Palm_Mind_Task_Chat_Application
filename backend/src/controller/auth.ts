// Related to auths
import type { Request, Response, NextFunction } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  BCRYPT_SALT_ROUNDS,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  NODE_ENV,
} from "../config/index.js";
import { User } from "../model/user.model.js";

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
      password: hashedPassword,
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

  const jwtPayload = {
    _id: user._id,
    name: user.fname + " " + user.lname,
  };

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

  const options: SignOptions = {
    expiresIn: (JWT_EXPIRES_IN || "7d") as any,
    algorithm: "HS256",
  };

  const token = jwt.sign(jwtPayload, JWT_SECRET, options);

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({ msg: "User Logged In", email: user.email });
};
