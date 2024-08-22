import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import { throwError } from "../utils/helpers.js";
import ProfileModel from "../models/profile.model.js";
import TokenModel from "../models/token.model.js";

const secretKey = process.env.SECRET_KEY;

const userController = {
  createUser: async (req, res) => {
    try {
      const { email, password, profileId } = req.body;

      const isValid = mongoose.Types.ObjectId.isValid(profileId);
      if (!isValid) throwError("Profile not exists!");
      const existProfile = await ProfileModel.findById(profileId);
      if (!existProfile) throwError("Profile not exists!");

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        profileId,
      });

      res.status(201).send({
        message: "Create a new user successfully!",
        data: {
          id: newUser._id,
          email,
          profileId,
        },
        isSuccess: true,
      });
    } catch (error) {
      if (error.code === 11000) {
        let message = null;

        if (error.keyPattern?.email) {
          message = "Email already exists!";
        } else if (error.keyPattern?.profileId) {
          message = "Profile has been already assigned to another user!";
        }

        if (message) {
          return res.status(500).send({
            message,
            data: null,
            isSuccess: false,
          });
        }
      }
      res.status(500).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existUser = await UserModel.findOne({ email });
      if (!existUser) throwError("Email or password is not correct!");

      const isPasswordCorrect = bcrypt.compareSync(
        password,
        existUser.password
      );
      if (!isPasswordCorrect) throwError("Email or password is not correct!");

      const userInfo = {
        id: existUser._id,
        email: existUser.email,
        profileId: existUser.profileId,
      };
      const token = await jwt.sign(userInfo, secretKey, { expiresIn: "1h" });

      const updatedToken = await TokenModel.findOneAndUpdate(
        { email },
        { token }
      );
      if (!updatedToken) {
        TokenModel.create({ token, email });
      }

      res.header("authorization", `Bearer ${token}`);
      res.status(200).send({
        message: "Login successfully!",
        data: userInfo,
        isSuccess: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
  logout: async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    await TokenModel.findOneAndDelete({ token });

    try {
      res.status(200).send({
        message: "Logout successfully!",
        data: null,
        isSuccess: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
};

export default userController;
