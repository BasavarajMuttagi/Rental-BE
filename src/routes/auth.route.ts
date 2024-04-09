import express from "express";
import {
  getBillingInfo,
  LoginUser,
  SignUpUser,
  updateProfileUrl,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { userLoginSchema, userSignUpSchema } from "../zod/authSchemas";
import { validateToken } from "../middlewares/auth.middleware";

const AuthRouter = express.Router();

AuthRouter.post("/signup", validate(userSignUpSchema), SignUpUser);
AuthRouter.post("/login", validate(userLoginSchema), LoginUser);
AuthRouter.post("/update", validateToken, updateProfileUrl);
AuthRouter.get("/billinginfo", validateToken, getBillingInfo);

export { AuthRouter };
