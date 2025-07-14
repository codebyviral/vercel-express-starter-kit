/* eslint-disable no-undef */
import dotenv from "dotenv";
import app from "./src/app.js";
import { connectToDatabase } from "./src/db/connect.js";

dotenv.config();

const PORT = process.env.PORT || 5000 + Math.floor(Math.random() * 1000); // avoid conflict

async function startServer() {
  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB in development environment");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running locally at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("⚠️ Have you set the MongoDB URL in the .env file?");
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
