/**
 * MongoDB Connection Utility for Serverless Environments
 * ------------------------------------------------------
 * This module is used in the `create-vercel-express-mongodb-app` package to
 * connect to MongoDB using Mongoose, optimized for platforms like Vercel.
 * 
 * Because serverless functions are stateless and restart on each request,
 * we use a cached connection (`global.mongoose`) to avoid creating new
 * connections every time — improving performance and stability.
 * 
 * Requires the `MONGODB_URI` environment variable to be set.
 * 
 * ⚠️ Modify with care: This logic is essential for reliable, production-ready
 * serverless deployments.
 */



import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_uri = process.env.MONGODB_URI;

if (!mongo_uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((mongoose) => mongoose)
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectToDatabase };
