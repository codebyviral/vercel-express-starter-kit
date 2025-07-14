import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri: string | undefined = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("❌ Please define the MONGODB_URI environment variable");
}

// Extend global to include cached connection
declare global {
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

// 🧠 Ensure global.mongoose is initialized
if (!global.mongoose) {
  console.log("🔄 Initializing new mongoose global cache");
  global.mongoose = { conn: null, promise: null };
}

// ✅ From this point, `global.mongoose` is guaranteed to exist
const cached = global.mongoose!;

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔌 Connecting to MongoDB for the first time...");
    cached.promise = mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then((mongooseInstance) => {
        console.log("✅ Successfully connected to MongoDB");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });
  } else {
    console.log("⏳ Awaiting ongoing MongoDB connection promise");
  }

  cached.conn = await cached.promise;
  console.log("📦 MongoDB connection cached");
  return cached.conn;
}

export { connectToDatabase };
