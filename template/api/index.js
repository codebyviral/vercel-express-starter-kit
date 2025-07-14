/**
 * API Entry Point for Vercel Serverless Deployment
 * ------------------------------------------------
 * ⚠️ This `/api/index.js` file acts as the entry point for serverless functions
 * on Vercel. It is designed to initialize the Express app and handle incoming requests.
 *
 * 👉 Define all routes and middleware in `app.js` to keep this file clean and modular.
 *
 * This structure is optimized for **production-ready** serverless environments.
 * Modify with care, especially when adjusting the export or request handling.
 */

import app from "../src/app.js";
import { connectToDatabase } from "../src/db/connect.js";

await connectToDatabase();

export default function handler(req, res) {
  app(req, res);
}
