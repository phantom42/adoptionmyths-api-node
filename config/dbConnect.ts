import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
	if (mongoose.connection.readyState >= 1) return;
	const uri = process.env.DATABASE_URI;
	if (!uri) throw new Error('DATABASE_URI not defined');
	await mongoose.connect(uri);
	console.log("Connected to MongoDB");
};

export default connectDB;
