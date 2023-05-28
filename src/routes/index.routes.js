import { Router } from "express";
import authRouter from "./users.routes.js";

const router = Router();

router.use(authRouter);

export default router;
