import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Server is Live...");
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});