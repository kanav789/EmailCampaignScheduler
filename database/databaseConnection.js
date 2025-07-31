import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGO_URI not set in environment variables");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit with failure
  }
};

export default dbConnect;
