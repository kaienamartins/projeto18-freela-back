import { Router } from "express";
import userRouter from "./users.routes.js";
import postsRouter from "./posts.routes.js";
import followRouter from "./follow.routes.js";

const router = Router();

router.use(userRouter, postsRouter, followRouter);

export default router;
