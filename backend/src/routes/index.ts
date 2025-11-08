// For Routes
import { Router } from "express";
import { createUser, loginUser } from "../controller/auth.js";

const authRouter = Router();
const chatRouter = Router();

authRouter.post("/create-user", createUser);
authRouter.post("/login", loginUser);

export { authRouter, chatRouter };
