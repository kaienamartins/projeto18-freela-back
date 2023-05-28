import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { signInMiddleware, signUpMiddleware } from "../middlewares/users.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { loginSchema, userSchema } from "../schemas/users.schema.js";
import { home } from "../controllers/users.controller.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), signUpMiddleware, signUp);
authRouter.post("/signin", validateSchema(loginSchema), signInMiddleware, signIn);
authRouter.get("/", home);

export default authRouter;
