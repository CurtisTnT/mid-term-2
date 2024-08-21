import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  const MONGO_CONNECT = `${process.env.MONGO_URI}/${process.env.MONGO_DATABASE}`;
  try {
    await mongoose.connect(MONGO_CONNECT);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connectDatabase;
