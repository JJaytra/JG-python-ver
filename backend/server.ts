import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router"; // Import your router file

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the router
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
