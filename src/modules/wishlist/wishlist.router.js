import { Router } from "express";
import { Role } from "../../../enums/role.js";
import { authorization } from "../../../middleware/authorization.js";
import {
  addToWishList,
  getAllWishList,
  removeFromWishList,
} from "./wishlist.controller.js";
import { wishlistSchema } from "./wishlist.validation.js";
import { authentication } from "../../../middleware/authentication.js";
import { validation } from "../../../middleware/validation.js";

const wishListRouter = Router();

wishListRouter
  .route("/:id")
  .patch(
    authentication,
    authorization(Role.ADMIN),
    validation(wishlistSchema),
    addToWishList
  )
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(wishlistSchema),
    removeFromWishList
  );

wishListRouter
  .route("/")
  .get(authentication, authorization(Role.ADMIN), getAllWishList);

export default wishListRouter;
