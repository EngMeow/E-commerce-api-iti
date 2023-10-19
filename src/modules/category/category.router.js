import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import { uploadSingleFile } from "../../../middleware/fileUpload.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import subcategoryRouter from "../subcategory/subCategory.router.js";
import { authentication } from "../../../middleware/authentication.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(
    authentication,
    authorization(Role.ADMIN),
    uploadSingleFile("img", "category"),
    validation(createCategorySchema),
    createCategory
  );

categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema), getCategory)
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteCategorySchema),
    deleteCategory
  )
  .put(
    authentication,
    authorization(Role.ADMIN),
    uploadSingleFile("img", "category"),
    validation(updateCategorySchema),
    updateCategory
  );

categoryRouter.use("/:categoryId/subcategories", subcategoryRouter);

export default categoryRouter;
