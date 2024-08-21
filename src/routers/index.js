import { Router } from "express";

import UserRouter from "./user.router.js";
import ProfileRouter from "./profile.router.js";

const RootRouterV1 = Router();

RootRouterV1.use("/users", UserRouter);
RootRouterV1.use("/profiles", ProfileRouter);

export default RootRouterV1;
