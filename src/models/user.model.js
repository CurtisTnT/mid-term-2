import mongoose from "mongoose";

import { Collections } from "../database/collections.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Collections.profiles,
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.model(Collections.users, userSchema);

export default UserModel;
