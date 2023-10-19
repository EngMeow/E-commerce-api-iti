import Joi from "joi";
export const createProductSchema = Joi.object({
  title: Joi.string().min(2).max(15).required(),
  description: Joi.string().min(5).max(300).required(),
  price: Joi.number().min(10).max(100000).required(),
  priceAfterDiscount: Joi.number().min(0),
});

export const getProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(2).max(15).required(),
  description: Joi.string().min(5).max(300).required(),
  price: Joi.number().min(10).max(100000).required(),
  priceAfterDiscount: Joi.number().min(0),
});
export const deleteProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
