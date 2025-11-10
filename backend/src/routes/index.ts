// For Routes
import { Router } from "express";
import { createUser, loginUser } from "../controller/auth.js";
import { authenticateJWTHTTP } from "../middleware/middleware.js";
import { getPrivateChats } from "../controller/privateChatApi.js";
import { getGroupChat } from "../controller/groupChatApi.js";

//  Auth Router
const authRouter = Router();
authRouter.post("/create-user", createUser);
authRouter.post("/login", loginUser);

// API Router
const apiRouter = Router();

// Middleware
apiRouter.use(authenticateJWTHTTP);

apiRouter.get("/pchat/:selectedUserId", getPrivateChats);

apiRouter.get("/gchat/:roomId", getGroupChat);

export { authRouter, apiRouter };
