import { Router } from "express";
import { post, likePost, unlikePost } from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";
import { authToken } from "../middlewares/auth.middleware.js";

const postsRouter = Router();

postsRouter.post("/posts", validateSchema(postSchema), authToken, post);
postsRouter.post("/posts/:postId/like", authToken, likePost);
postsRouter.delete("/posts/:postId/unlike", authToken, unlikePost);

export default postsRouter;
