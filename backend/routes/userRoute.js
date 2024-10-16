import express from "express";
import { loginUser, registerUser, forgotPassword, resetPassword, googleAuth, sendFeedback } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword); 
userRouter.post("/reset-password", resetPassword); 
userRouter.post("/google-login",googleAuth);
userRouter.post("/feedback", sendFeedback);


export default userRouter;
