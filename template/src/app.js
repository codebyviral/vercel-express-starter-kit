// src/app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import exampleRoutes from "./routes/example.router.js";
import healthRoutes from "./routes/health.router.js";

// Load environment variables from .env file
dotenv.config({ silent: true });

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Example API routes
app.use("/api/example", exampleRoutes);
app.use("/health",healthRoutes)
// Root route - Health check
app.get("/", (req, res) => {
  res.send(
    "✅ Server (JavaScript) is up and running smoothly! Explore API at /api/example"
  );
});

export default app;
