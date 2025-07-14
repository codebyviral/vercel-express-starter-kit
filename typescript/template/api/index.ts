/**
 * Main Server Entry (index.ts) — Vercel + Express + MongoDB Setup
 * ----------------------------------------------------------------
 * This is the main server file for the `create-vercel-express-mongodb-app` package.
 * It sets up the Express application, connects to MongoDB, and starts the server.
 * 
 * ✅ Routes are defined directly here (e.g., `/api`, `/`) and should be organized
 * using route modules like `user.routes.ts` for scalability.
 * 
 * ✅ Uses `connectToDatabase()` to establish a MongoDB connection with caching,
 * optimized for **serverless environments** like Vercel.
 * 
 * ⚠️ Modify with care: This is the production-ready entry point expected by Vercel.
 * Ensure the default export (`export default app`) is preserved for correct deployment.
 */

import express from "express";
import { connectToDatabase } from "./db/connection";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes); // This prefixes all routes with /api

app.get("/", (req, res) => {
  res.send("🚀 Express + Vercel + MongoDB is running!");
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚡️ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });

export default app; // required by Vercel
