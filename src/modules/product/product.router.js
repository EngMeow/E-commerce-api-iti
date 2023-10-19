import { Router } from "express";
import { uploadMixFile } from "../../../middleware/fileUpload.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.validation.js";
import { authentication } from "../../../middleware/authentication.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import { validation } from "../../../middleware/validation.js";

const productRouter = Router();

productRouter
  .route("/")
  .post(
    authentication,
    authorization(Role.ADMIN),
    uploadMixFile(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 8 },
      ],
      "product"
    ),
    validation(createProductSchema),
    createProduct
  )
  .get(getAllProducts);
productRouter
  .route("/:id")
  .get(validation(getProductSchema), getProduct)
  .put(
    authentication,
    authorization(Role.ADMIN),
    uploadMixFile(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 8 },
      ],
      "product"
    ),
    validation(updateProductSchema),
    updateProduct
  )
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteProductSchema),
    deleteProduct
  );
export default productRouter;
