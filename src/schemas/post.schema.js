import joi from "joi";

export const postSchema = joi.object({
  description: joi.string().required(),
  image: joi.string().required(),
  likes: joi.number().required(),
  createdAt: joi.date().required(),
});
