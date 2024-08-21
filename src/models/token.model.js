import mongoose from "mongoose";

import { Collections } from "../database/collections.js";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const TokenModel = mongoose.model(Collections.tokens, tokenSchema);

export default TokenModel;
