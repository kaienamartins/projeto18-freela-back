import { Router } from "express";
import { post } from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postsRouter = Router();

postsRouter.post("/posts", validateSchema(postSchema), post);


export default postsRouter;
