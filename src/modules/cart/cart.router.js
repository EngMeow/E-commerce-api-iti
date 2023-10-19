import { Router } from "express";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import { authentication } from "../../../middleware/authentication.js";
import { addCart } from "./cart.controller.js";
const cartRouter = Router();

cartRouter
  .route("/:productId")
  .post(authentication, authorization(Role.USER, Role.ADMIN), addCart);

export default cartRouter;
