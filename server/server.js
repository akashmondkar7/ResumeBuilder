import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
await connectDB();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Server is Live...");
});
app.use('/api/users',userRouter)
// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});