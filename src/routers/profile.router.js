import { Router } from "express";

import profileController from "../controllers/profile.controller.js";
import userMiddleware from "../middleware/user.middleware.js";

const ProfileRouter = Router();

ProfileRouter.post("", profileController.createProfile);

ProfileRouter.get(
  "/:id",
  userMiddleware.validateAuth,
  profileController.getProfile
);

ProfileRouter.put(
  "/:id",
  userMiddleware.validateAuth,
  profileController.updateProfile
);

ProfileRouter.delete(
  "/:id",
  userMiddleware.validateAuth,
  profileController.deleteProfile
);

export default ProfileRouter;
