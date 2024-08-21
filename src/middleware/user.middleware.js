import jwt from "jsonwebtoken";

import { throwError } from "../utils/helpers.js";
import TokenModel from "../models/token.model.js";

const secretKey = process.env.SECRET_KEY;

const userMiddleware = {
  validateCreateUser: async (req, res, next) => {
    try {
      const { email, password, profileId } = req.body;

      if (!email) throwError("Email is missing!");
      if (!password) throwError("Password is missing!");
      if (!profileId) throwError("Profile is missing!");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
  validateLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) throwError("Email is missing!");
      if (!password) throwError("Password is missing!");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
  validateAuth: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) throwError("Access token is missing!");
    const token = authorization.split(" ")[1];

    try {
      const existToken = await TokenModel.findOne({ token });
      if (!existToken) throwError("Token is revoked or inactive!");

      await jwt.verify(token, secretKey);

      return next();
    } catch (error) {
      if (error.message === "jwt expired") {
        await TokenModel.findOneAndDelete({ token });
      }

      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
};

export default userMiddleware;
