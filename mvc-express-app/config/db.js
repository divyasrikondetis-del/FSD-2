import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Problem while connecting MongoDB:", err.message);
    throw err;
  }
};

export default connectDB;