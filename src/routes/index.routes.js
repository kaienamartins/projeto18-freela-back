import { Router } from "express";
import authRouter from "./users.routes.js";
import postsRouter from "./posts.routes.js";
import followRouter from "./follow.routes.js";

const router = Router();

router.use(authRouter, postsRouter, followRouter);

export default router;
