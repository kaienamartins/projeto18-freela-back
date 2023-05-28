import joi from "joi";

export const followersSchema = joi.object({
  followerId: joi.number().integer().required(),
  userId: joi.number().integer().required(),
  createdAt: joi.date().required(),
});

export const followingSchema = joi.object({
  followerId: joi.number().integer().required(),
  userId: joi.number().integer().required(),
  createdAt: joi.date().required(),
});