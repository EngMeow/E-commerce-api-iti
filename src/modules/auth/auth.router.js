import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import { signInSchema } from "./auth.validation.js";
import { signIn } from "./auth.controller.js";

const authRouter = Router();
authRouter.route("/signIn").post(validation(signInSchema), signIn);

export default authRouter;
