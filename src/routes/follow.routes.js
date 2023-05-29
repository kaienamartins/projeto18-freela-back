import { Router } from "express";
import {
  getFollowers,
  getFollowing,
  followProfile,
  unfollowProfile,
} from "../controllers/followers.controller.js";
import { authToken } from "../middlewares/auth.middleware.js";

const followRouter = Router();

followRouter.get("/user/me/followers", authToken, getFollowers);
followRouter.get("/user/me/following", authToken, getFollowing);
followRouter.post("/user/:id/follow", authToken, followProfile);
followRouter.delete("/user/:id/unfollow", authToken, unfollowProfile);

export default followRouter;
