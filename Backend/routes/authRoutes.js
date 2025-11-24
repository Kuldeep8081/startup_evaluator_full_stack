// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser, userProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware,logoutUser);
router.get("/profile",authMiddleware,userProfile);
export default router;
