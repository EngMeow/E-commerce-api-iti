import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "./subCategory.controller.js";
import {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from "./subCategory.validation.js";
import { Role } from "../../../enums/role.js";
import { deleteCategorySchema } from "../category/category.validation.js";
import { authorization } from "../../../middleware/authorization.js";
import { validation } from "../../../middleware/validation.js";
import { authentication } from "../../../middleware/authentication.js";

const subcategoryRouter = Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(
    authentication,
    authorization(Role.ADMIN),
    validation(createSubCategorySchema),
    createSubCategory
  )
  .get(getAllSubCategories);

subcategoryRouter
  .route("/:id")
  .get(
    authentication,
    authorization(Role.ADMIN),
    validation(getSubCategorySchema),
    getSubCategory
  )
  .put(
    authentication,
    authorization(Role.ADMIN),
    validation(updateSubCategorySchema),
    updateSubCategory
  )
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteCategorySchema),
    deleteSubCategory
  );

export default subcategoryRouter;
