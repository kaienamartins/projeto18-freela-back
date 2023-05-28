import { Router } from "express";
import { getFollowers, getFollowing } from "../controllers/followers.controller.js";

const followRouter = Router();

followRouter.get("/user/me/followers", getFollowers);
followRouter.get("/user/me/following", getFollowing);

export default followRouter;
