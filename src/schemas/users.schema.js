import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  profilePic: joi.string().uri(),
  biography: joi.string().max(200),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
