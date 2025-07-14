import express from "express";
import { healthStatus } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/", healthStatus);

export default router;
