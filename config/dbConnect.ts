import mongoose from "mongoose";

const connectDB = async () => {
	const uri = process.env.DATABASE_URI;
	if (!uri) throw new Error('DATABASE_URI not defined');
  try {
	await mongoose.connect(uri);
	console.log("Connected to MongoDB");
  } catch (error) {
	console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;