import { Router } from "express";
import {
  signIn,
  signUp,
  getUser,
  searchUser,
  visitProfile,
} from "../controllers/users.controller.js";
import { signInMiddleware, signUpMiddleware } from "../middlewares/users.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { loginSchema, userSchema } from "../schemas/users.schema.js";
import { authToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSchema), signUpMiddleware, signUp);
userRouter.post("/signin", validateSchema(loginSchema), signInMiddleware, signIn);
userRouter.get("/user/me", authToken, getUser);
userRouter.get("/user/search", authToken, searchUser);
userRouter.get("/user/:id/profile", authToken, visitProfile);

export default userRouter;
