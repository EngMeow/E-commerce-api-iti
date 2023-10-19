import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  changeUserPasswordSchema,
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "./user.validation.js";
import {
  changeUserPassword,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";

const userRouter = Router();

userRouter
  .route("/")
  .post(validation(createUserSchema), createUser)
  .get(getAllUsers);
userRouter
  .route("/:id")
  .get(validation(getUserSchema), getUser)
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteUserSchema),
    deleteUser
  )
  .put(
    authentication,
    authorization(Role.ADMIN),
    validation(updateUserSchema),
    updateUser
  )
  .patch(
    authentication,
    authorization(Role.ADMIN),
    validation(changeUserPasswordSchema),
    changeUserPassword
  );

export default userRouter;
