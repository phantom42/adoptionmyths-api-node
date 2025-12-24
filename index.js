import "dotenv/config";
import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
import rootRouter from "./routes/root.js";
import mythRouter from './routes/api/myths.js';
import connectDB from "./config/dbConnect.js";

const app = express();
//const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
//app.options('/*splat', cors()) 
app.use(cors({
	origin: true, // IMPORTANT: reflect request origin
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", rootRouter);   
app.use("/myths", mythRouter);
app.use("/api/myths", mythRouter);

// Local-only server

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

connectDB();

export default app;
