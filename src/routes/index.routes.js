import { Router } from "express";
import authRouter from "./users.routes.js";
import postsRouter from "./posts.routes.js";

const router = Router();

router.use(authRouter, postsRouter);

export default router;
