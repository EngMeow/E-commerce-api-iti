import { Router } from "express";
import { Role } from "../../../enums/role.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { validation } from "../../../middleware/validation.js";
import {
  addAddress,
  getAddress,
  getAllAddresses,
  removeAddress,
} from "./address.controller.js";
import {
  addAddressSchema,
  getAddressSchema,
  removeAddressSchema,
} from "./address.validation.js";
const addressRouter = Router();

addressRouter
  .route("/:id")
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(removeAddressSchema),
    removeAddress
  )
  .get(
    authentication,
    authorization(Role.ADMIN),
    validation(getAddressSchema),
    getAddress
  );

addressRouter
  .route("/")
  .post(
    authentication,
    authorization(Role.ADMIN),
    validation(addAddressSchema),
    addAddress
  )
  .get(authentication, authorization(Role.ADMIN), getAllAddresses);

export default addressRouter;
