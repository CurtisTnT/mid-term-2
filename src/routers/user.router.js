import { Router } from "express";

import userMiddleware from "../middleware/user.middleware.js";
import userController from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post(
  "/create",
  userMiddleware.validateCreateUser,
  userController.createUser
);

UserRouter.post(
  "/login",
  userMiddleware.validateLogin,
  userController.login
);

UserRouter.post(
  "/logout",
  userMiddleware.validateAuth,
  userController.logout
);

export default UserRouter;
