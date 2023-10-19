import { Router } from "express";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import { validation } from "../../../middleware/validation.js";
import {
  createReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  updateReviewSchema,
} from "./review.validation.js";
import { authentication } from "../../../middleware/authentication.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from "./review.controller.js";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .post(
    authentication,
    authorization(Role.USER),
    validation(createReviewSchema),
    createReview
  )
  .get(getAllReviews);
reviewRouter
  .route("/:id")
  .get(validation(getReviewSchema), getReview)
  .delete(validation(deleteReviewSchema), deleteReview)
  .put(
    authentication,
    authorization(Role.USER),
    validation(updateReviewSchema),
    updateReview
  );
export default reviewRouter;
