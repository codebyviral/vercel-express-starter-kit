import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/users", getAllUsers); // Handles GET /api/users

export default router;
