import { Router } from "express";
import { Role } from "../../../enums/role.js";
import { uploadSingleFile } from "../../../middleware/fileUpload.js";
import { validation } from "../../../middleware/validation.js";
import {
  createBrandSchema,
  deleteBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "./brand.validation.js";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "./brand.controller.js";
import { authorization } from "../../../middleware/authorization.js";
import { authentication } from "../../../middleware/authentication.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .post(
    authentication,
    authorization(Role.ADMIN),
    uploadSingleFile("logo", "brand"),
    validation(createBrandSchema),
    createBrand
  )
  .get(getAllBrands);

brandRouter
  .route("/:id")
  .get(validation(getBrandSchema), getBrand)
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteBrandSchema),
    deleteBrand
  )
  .put(
    authentication,
    authorization(Role.ADMIN),
    uploadSingleFile("logo", "brand"),
    validation(updateBrandSchema),
    updateBrand
  );
export default brandRouter;
