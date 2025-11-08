// For Routes
import { Router } from "express";
import { createUser, loginUser } from "../controller/auth.js";

//  Auth Router
const authRouter = Router();

// Middleware for Auth


//  Auth ChatRouter
const chatRouter = Router();

authRouter.post("/create-user", createUser);
authRouter.post("/login", loginUser);

export { authRouter, chatRouter };
