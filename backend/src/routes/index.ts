// For Routes
import { Router } from "express";
import { createUser, loginUser } from "../controller/auth.js";
import { authenticateJWT } from "../middleware/middleware.js";
import {
  saveConvo,
  getConvo,
  deleteConvo,
  editConvo,
} from "../controller/chat.js";

//  Auth Router
const authRouter = Router();
authRouter.post("/create-user", createUser);
authRouter.post("/login", loginUser);

//  Chat Router
const chatRouter = Router();

// Middleware
chatRouter.use(authenticateJWT);

chatRouter.get("/get", getConvo);
chatRouter.post("/save", saveConvo);
chatRouter.post("/update", getConvo);
chatRouter.post("/delete", deleteConvo);

export { authRouter, chatRouter };
